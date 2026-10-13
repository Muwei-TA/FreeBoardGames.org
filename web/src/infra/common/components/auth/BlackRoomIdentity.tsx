import React from 'react';
import { useDispatch } from 'react-redux';
import { LobbyService } from '../../services/LobbyService';
import { fetchBlackRoomUsername } from '../../services/BlackRoomSession';

// Keep game components (including room joins) behind verified current membership.
export function BlackRoomIdentity({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let disposed = false;
    let username: string;
    let checking = false;
    let initialized = false;
    const initialize = async () => {
      try {
        username = await fetchBlackRoomUsername();
        if (disposed) return;
        await LobbyService.initializeBlackRoom(username);
        initialized = true;
        if (!disposed) {
          dispatch(LobbyService.getSyncUserAction());
          setReady(true);
        }
      } catch (_) {
        if (!disposed) setFailed(true);
      }
    };
    const verify = async () => {
      if (!initialized || checking || document.hidden) return;
      checking = true;
      try {
        const currentUsername = await fetchBlackRoomUsername();
        if (disposed) return;
        if (currentUsername !== username) {
          LobbyService.invalidateUserAuth();
          window.location.reload();
        }
      } catch (_) {
        if (!disposed) {
          setReady(false);
          setFailed(true);
        }
      } finally {
        checking = false;
      }
    };
    initialize();
    window.addEventListener('focus', verify);
    document.addEventListener('visibilitychange', verify);
    return () => {
      disposed = true;
      window.removeEventListener('focus', verify);
      document.removeEventListener('visibilitychange', verify);
    };
  }, [dispatch]);

  if (failed) {
    return (
      <div role="alert">
        无法确认 BlackRoom 身份，请确认已登录后重试。
        <button onClick={() => window.location.reload()}>重试</button>
      </div>
    );
  }
  return ready ? <>{children}</> : <p role="status">正在确认 BlackRoom 身份…</p>;
}

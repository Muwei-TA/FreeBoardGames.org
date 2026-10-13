import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import { GameSharing } from './GameSharing';

const GAME_LINK = 'http://localhost/zh/room/fooroom';

afterEach(cleanup);

describe('GameSharing', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    window.location.assign = jest.fn();
    window.open = jest.fn();
    window.alert = jest.fn();
    wrapper = render(<GameSharing gameCode={'foogame'} roomID={'fooroom'} isPublic={false} />);
  });

  it('should render', () => {
    expect(wrapper.getByText(/邀请你的好友/)).toBeTruthy();
  });

  it('should open then close QR code', () => {
    const button = wrapper.getByLabelText('QR code');
    fireEvent.click(button);
    expect(wrapper.getByText('扫描二维码')).toBeInTheDocument();
    const closeButton = wrapper.getByText('完成');
    fireEvent.click(closeButton);
    expect(wrapper.queryByText('扫描二维码')).not.toBeInTheDocument();
  });

  it('should share on Facebook', () => {
    const button = wrapper.getByLabelText('Facebook');
    fireEvent.click(button);
    expect(window.open as any).toHaveBeenCalled();
  });

  it('should share on WhatsApp', () => {
    const button = wrapper.getByLabelText('WhatsApp');
    fireEvent.click(button);
    expect(window.open as any).toHaveBeenCalled();
  });

  it('should copy link with i18n language', () => {
    jest.useFakeTimers();
    const button = wrapper.getByLabelText('Copy');
    fireEvent.click(button);
    expect(wrapper.getByText('已复制！')).toBeInTheDocument();
    jest.runAllTimers();
    expect((window as any).copyClipboardMock).toHaveBeenCalledWith(GAME_LINK);
  });
});

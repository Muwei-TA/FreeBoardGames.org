export function isValidNickname(value: string): boolean {
  return typeof value === 'string' && Array.from(value).length >= 1 && Array.from(value).length <= 32 &&
    !/[\s\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060-\u206f]/.test(value);
}

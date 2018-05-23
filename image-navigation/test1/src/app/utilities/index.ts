import * as fs from 'fs';

export async function delay(seconds: number) {
  return new Promise(resolve => setTimeout(() => resolve(), seconds * 1000));
}

export async function remove(path: string) {
  return new Promise(resolve => fs.unlink(path, resolve));
}

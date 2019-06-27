/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import {ENV} from '../environment';
import {Platform} from './platform';

export class PlatformBrowser implements Platform {
  private textEncoder: TextEncoder;

  constructor() {
    // According to the spec, the built-in encoder can do only UTF-8 encoding.
    // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/TextEncoder
    this.textEncoder = new TextEncoder();
  }

  encode(text: string, encoding: string): Uint8Array {
    if (encoding !== 'utf-8' && encoding !== 'utf8') {
      throw new Error(
          `Browser's encoder only supports utf-8, but got ${encoding}`);
    }
    return this.textEncoder.encode(text);
  }
  decode(bytes: Uint8Array, encoding: string): string {
    return new TextDecoder(encoding).decode(bytes);
  }
  fetch(path: string, init?: RequestInit): Promise<Response> {
    return fetch(path, init);
  }
}

if (ENV.get('IS_BROWSER')) {
  ENV.setPlatform('browser', new PlatformBrowser());
}

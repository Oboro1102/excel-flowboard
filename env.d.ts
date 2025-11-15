/// <reference types="vite/client" />
declare module 'crypto-js/rabbit'
declare module 'crypto-js/enc-utf8'
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        XLSX: any;
    }
}
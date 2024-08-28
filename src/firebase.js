// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Send the token to the client
// ...

function _0x1f9c() { const _0x2fd971 = ['912118102807', '10ztcnGB', 'note-nest-170f0.appspot.com', '5006722lhiOkp', '2785224AFphjk', 'AIzaSyCHRHj59Z-Q-esM_cOwQ5NUUyD31nCfBw0', '3656312KQFFlR', 'note-nest-170f0', '2770914KcQqbr', '798576vXdbRW', '495695vRXSgr', '2412376inSaug', '1:912118102807:web:030071436f3cc644ca1552']; _0x1f9c = function () { return _0x2fd971; }; return _0x1f9c(); } function _0xa359(_0x1a4031, _0x17b181) { const _0x1f9c3e = _0x1f9c(); return _0xa359 = function (_0xa3591b, _0x10a623) { _0xa3591b = _0xa3591b - 0x90; let _0xf8ed1c = _0x1f9c3e[_0xa3591b]; return _0xf8ed1c; }, _0xa359(_0x1a4031, _0x17b181); } const _0x4ce7ba = _0xa359; (function (_0x1ee547, _0x3126dc) { const _0x5f33c7 = _0xa359, _0x539ff9 = _0x1ee547(); while (!![]) { try { const _0x5744d6 = -parseInt(_0x5f33c7(0x9c)) / 0x1 + -parseInt(_0x5f33c7(0x90)) / 0x2 + parseInt(_0x5f33c7(0x96)) / 0x3 + parseInt(_0x5f33c7(0x9b)) / 0x4 + -parseInt(_0x5f33c7(0x93)) / 0x5 * (-parseInt(_0x5f33c7(0x9a)) / 0x6) + parseInt(_0x5f33c7(0x95)) / 0x7 + -parseInt(_0x5f33c7(0x98)) / 0x8; if (_0x5744d6 === _0x3126dc) break; else _0x539ff9['push'](_0x539ff9['shift']()); } catch (_0x1f3e12) { _0x539ff9['push'](_0x539ff9['shift']()); } } }(_0x1f9c, 0x9470e)); const firebaseConfig = { 'apiKey': _0x4ce7ba(0x97), 'authDomain': 'note-nest-170f0.firebaseapp.com', 'projectId': _0x4ce7ba(0x99), 'storageBucket': _0x4ce7ba(0x94), 'messagingSenderId': _0x4ce7ba(0x92), 'appId': _0x4ce7ba(0x91) };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

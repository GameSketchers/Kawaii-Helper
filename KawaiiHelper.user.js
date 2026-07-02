// ==UserScript==
// @name         Kawaii Helper & Drawing Bot for Gartic.io (New Draw Engine)
// @name:tr      Gartic.io için Kawaii Yardımcı & Çizim Botu
// @name:ja      Gartic.io用 Kawaii Helper ＆ 描画ボット
// @namespace    https://github.com/GameSketchers/Kawaii-Helper
// @version      2026-07-02
// @description  Helper for Gartic.io with auto-guess, drawing assistance, and drawing bot
// @description:tr  Gartic.io için otomatik tahmin, çizim yardımı ve çizim botu ile yardımcı
// @description:ja  自動推測、描画アシスト、描画ボットを備えたGartic.io用ヘルパー
// @author       anonimbiri & Game Sketchers
// @license      MIT
// @match        *://*.gartic.io/*
// @exclude      *://gartic.io/_next/*
// @exclude      *://gartic.io/static/*
// @icon         https://cdn.jsdelivr.net/gh/GameSketchers/Kawaii-Helper@refs/heads/main/Assets/kawaii-logo.png
// @supportURL   https://github.com/GameSketchers/Kawaii-Helper/issues/new?labels=bug&type=bug&template=bug_report.md&title=Bug+Report
// @homepage     https://github.com/GameSketchers/Kawaii-Helper
// @run-at       document-start
// @tag          games
// @grant        none
// @noframes
// ==/UserScript==

/*
✧ Kawaii Helper 2026-07-02 Update ✧

• Drawing engine completely overhauled with Vector Draw
• Advanced vector rendering: smart color palette extraction, zigzag path generation, and skeleton-based line art for B&W images
• Optimized 120ms draw speed (no more getting kicked for spamming)

note by qwyua: Works flawlessly with line-art style drawings.
Some bugs and color artifacts may occur when processing
colorful images — im aware but not fixing further deal with it =)

created by anonimbiri & reworked by qwyua
*/

(function() {
    'use strict';

    class KawaiiHelper {
        #game = null;
        #chat = null;
        #answer = null;
        #CW = 767;
        #CH = 448;
        #MARGIN = 10;
        #PING_EVERY = 5;
        #MAX_CHUNK = 20;
        #RDP_EPSILON = 2.5;
        #CONNECT_DIST = 7;
        #SMOOTH_WINDOW = 4;
        #THINNING_ITERATIONS = 18;
        #COLOR_COUNT = 24;
        #WHITE_THRESHOLD = 240;
        #MIN_COMPONENT_SIZE = 20;
        #myTurnDrawing = false;
        #drawState = {
            socket: null,
            commands: [],
            seq: 0,
            running: false,
            paused: false,
            timer: null,
            speed: 120,
            threshold: 110,
            thickness: 3,
            minPathLen: 6,
            mode: 'Unknown'
        };
        constructor() {
            this.translations = {
                en: {
                    "✧ Kawaii Helper ✧": "✧ Kawaii Helper ✧",
                    "Guessing": "Guessing",
                    "Drawing": "Drawing",
                    "Auto Guess": "Auto Guess",
                    "Speed": "Speed",
                    "Custom Words": "Custom Words",
                    "Drop word list here or click to upload": "Drop word list here or click to upload",
                    "Enter pattern (e.g., ___e___)": "Enter pattern (e.g., ___e___)",
                    "Type a pattern to see matches ✧": "Type a pattern to see matches ✧",
                    "Upload a custom word list ✧": "Upload a custom word list ✧",
                    "No words available ✧": "No words available ✧",
                    "No matches found ✧": "No matches found ✧",
                    "Tried Words": "Tried Words",
                    "Drop image here or click to upload": "Drop image here or click to upload",
                    "Search on Google Images 🡵": "Search on Google Images 🡵",
                    "Draw Speed": "Draw Speed",
                    "Color Tolerance": "Color Tolerance",
                    "Draw Now ✧": "Draw Now ✧",
                    "Stop Drawing ✧": "Stop Drawing ✧",
                    "Made with ♥ by Anonimbiri & GameSketchers": "Made with ♥ by Anonimbiri & GameSketchers",
                    "Loaded ${wordList['Custom'].length} words from ${file.name}": "Loaded ${wordList['Custom'].length} words from ${file.name}",
                    "Not your turn or game not loaded! ✧": "Not your turn or game not loaded! ✧",
                    "Game not ready or not your turn! ✧": "Game not ready or not your turn! ✧",
                    "Canvas not accessible! ✧": "Canvas not accessible! ✧",
                    "Canvas context not available! ✧": "Canvas context not available! ✧",
                    "Temp canvas context failed! ✧": "Temp canvas context failed! ✧",
                    "Image data error: ${e.message} ✧": "Image data error: ${e.message} ✧",
                    "Drawing completed! ✧": "Drawing completed! ✧",
                    "Failed to load image! ✧": "Failed to load image! ✧",
                    "Drawing stopped! ✧": "Drawing stopped! ✧",
                    "Settings": "Settings",
                    "Auto Kick": "Auto Kick",
                    "No Kick Cooldown": "No Kick Cooldown",
                    "Chat Bypass Censorship": "Chat Bypass Censorship",
                    "New update available!": "New update available!",
                    "Drawing... ${count} color groups created.": "Drawing... ${count} color groups created.",
                    "Text To Draw": "Enter text to draw."
                },
                tr: {
                    "✧ Kawaii Helper ✧": "✧ Kawaii Yardımcı ✧",
                    "Guessing": "Tahmin",
                    "Drawing": "Çizim",
                    "Auto Guess": "Otomatik Tahmin",
                    "Speed": "Hız",
                    "Custom Words": "Özel Kelimeler",
                    "Drop word list here or click to upload": "Kelime listesini buraya bırak veya yüklemek için tıkla",
                    "Enter pattern (e.g., ___e___)": "Desen gir (ör., ___e___)",
                    "Type a pattern to see matches ✧": "Eşleşmeleri görmek için bir desen yaz ✧",
                    "Upload a custom word list ✧": "Özel bir kelime listesi yükle ✧",
                    "No words available ✧": "Kelime yok ✧",
                    "No matches found ✧": "Eşleşme bulunamadı ✧",
                    "Tried Words": "Denenen Kelimeler",
                    "Drop image here or click to upload": "Resmi buraya bırak veya yüklemek için tıkla",
                    "Search on Google Images 🡵": "Google Görsellerde Ara 🡵",
                    "Draw Speed": "Çizim Hızı",
                    "Color Tolerance": "Renk Toleransı",
                    "Draw Now ✧": "Şimdi Çiz ✧",
                    "Stop Drawing ✧": "Çizimi Durdur ✧",
                    "Made with ♥ by Anonimbiri & GameSketchers": "Anonimbiri & GameSketchers tarafından ♥ ile yapıldı",
                    "Loaded ${wordList['Custom'].length} words from ${file.name}": "${file.name} dosyasından ${wordList['Custom'].length} kelime yüklendi",
                    "Not your turn or game not loaded! ✧": "Sıra sende değil veya oyun yüklenmedi! ✧",
                    "Game not ready or not your turn! ✧": "Oyun hazır değil veya sıra sende değil! ✧",
                    "Canvas not accessible! ✧": "Tuval erişilemez! ✧",
                    "Canvas context not available! ✧": "Tuval bağlamı kullanılamıyor! ✧",
                    "Temp canvas context failed! ✧": "Geçici tuval bağlamı başarısız! ✧",
                    "Image data error: ${e.message} ✧": "Görüntü verisi hatası: ${e.message} ✧",
                    "Drawing completed! ✧": "Çizim tamamlandı! ✧",
                    "Failed to load image! ✧": "Görüntü yüklenemedi! ✧",
                    "Drawing stopped! ✧": "Çizim durduruldu! ✧",
                    "Settings": "Ayarlar",
                    "Auto Kick": "Otomatik Atma",
                    "No Kick Cooldown": "Atma Bekleme Süresi Yok",
                    "Chat Bypass Censorship": "Sohbet Sansürünü Atlat",
                    "New update available!": "Yeni güncelleme var!",
                    "Drawing... ${count} color groups created.": "Çiziliyor... ${count} renk grubu oluşturuldu.",
                    "Text To Draw": "Çizmek istediğiniz metni girin."
                },
                ja: {
                    "✧ Kawaii Helper ✧": "✧ Kawaii ヘルパー ✧",
                    "Guessing": "推測",
                    "Drawing": "描画",
                    "Auto Guess": "自動推測",
                    "Speed": "速度",
                    "Custom Words": "カスタム単語",
                    "Drop word list here or click to upload": "単語リストをここにドロップするか、クリックしてアップロード",
                    "Enter pattern (e.g., ___e___)": "パターンを入力 (例: ___e___)",
                    "Type a pattern to see matches ✧": "パターンを入力して一致を確認 ✧",
                    "Upload a custom word list ✧": "カスタム単語リストをアップロード ✧",
                    "No words available ✧": "利用可能な単語がありません ✧",
                    "No matches found ✧": "一致するものがありません ✧",
                    "Tried Words": "試した単語",
                    "Drop image here or click to upload": "画像をここにドロップするか、クリックしてアップロード",
                    "Search on Google Images 🡵": "Google画像検索 🡵",
                    "Draw Speed": "描画速度",
                    "Color Tolerance": "色の許容範囲",
                    "Draw Now ✧": "今すぐ描画 ✧",
                    "Stop Drawing ✧": "描画を停止 ✧",
                    "Made with ♥ by Anonimbiri & GameSketchers": "Made with ♥ by Anonimbiri & GameSketchers",
                    "Loaded ${wordList['Custom'].length} words from ${file.name}": "${file.name} から ${wordList['Custom'].length} 語を読み込みました",
                    "Not your turn or game not loaded! ✧": "あなたのターンではないか、ゲームが読み込まれていません！ ✧",
                    "Game not ready or not your turn! ✧": "ゲームの準備ができていないか、あなたのターンではありません！ ✧",
                    "Canvas not accessible! ✧": "キャンバスにアクセスできません！ ✧",
                    "Canvas context not available! ✧": "キャンバスコンテキストが利用できません！ ✧",
                    "Temp canvas context failed! ✧": "一時キャンバスの取得に失敗しました！ ✧",
                    "Image data error: ${e.message} ✧": "画像データエラー: ${e.message} ✧",
                    "Drawing completed! ✧": "描画が完了しました！ ✧",
                    "Failed to load image! ✧": "画像の読み込みに失敗しました！ ✧",
                    "Drawing stopped! ✧": "描画を停止しました！ ✧",
                    "Settings": "設定",
                    "Auto Kick": "自動キック",
                    "No Kick Cooldown": "キックの待機時間なし",
                    "Chat Bypass Censorship": "チャットの検閲を回避",
                    "New update available!": "新しいアップデートが利用可能です！",
                    "Drawing... ${count} color groups created.": "描画中... ${count} 個のカラーグループを作成しました。",
                    "Text To Draw": "描くテキストを入力"
                }
            };
            this.currentLang = navigator.language.split('-')[0] in this.translations ? navigator.language.split('-')[0] : 'en';
            this.wordList = { "Custom": [] };
            this.wordListURLs = {
                "General (en)": "https://cdn.jsdelivr.net/gh/GameSketchers/Game-WordList@master/languages/English/general.json",
                "General (tr)": "https://cdn.jsdelivr.net/gh/GameSketchers/Game-WordList@master/languages/Turkish/general.json",
                "General (ja)": "https://cdn.jsdelivr.net/gh/GameSketchers/Game-WordList@master/languages/Japanese/general.json"
            };
            this.elements = {};
            this.state = {
                isDragging: false,
                initialX: 0,
                initialY: 0,
                xOffset: 0,
                yOffset: 0,
                rafId: null,
                autoGuessInterval: null,
                triedLabelAdded: false
            };
            this.lastTheme = "Custom";
            this.settings = this.loadSettings();
        }
        #onElementAdded=(s,c,m=0)=>{let o,d=0,p=e=>(d||c(e),m||(d=1,o?.disconnect())),t=()=>{o?.disconnect(),d=0,o=new MutationObserver(r=>{for(let i=0;i<r.length;i++)for(let n of r[i].addedNodes)n.nodeType===1&&(n.matches?.(s)?p(n):(n.querySelector?.(s)&&p(n.querySelector(s))))}),o.observe(document.documentElement,{childList:1,subtree:1});document.querySelector(s)&&p(document.querySelector(s))};t();return{stop:()=>(o?.disconnect(),d=1),start:()=>(o?.disconnect(),t()),get active(){return!d}}}
        static init() {
            const helper = new KawaiiHelper();
            helper.setup();
            return helper;
        }

        checkForUpdates() {
            const url = 'https://api.github.com/repos/GameSketchers/Kawaii-Helper/releases/latest';
            const req = new XMLHttpRequest();
            req.open("GET", url, false);
            req.setRequestHeader('Accept', 'application/vnd.github.v3+json');
            try {
                req.send();
                if (req.status === 200) {
                    const latest = JSON.parse(req.responseText).tag_name.replace(/^v/, '');
                    if (latest > GM_info.script.version) {
                        this.showNotification(
                            this.localize("New update available!"),
                            1e4,
                            { text: 'Update', action: () => window.open('https://github.com/GameSketchers/Kawaii-Helper/releases/latest', '_blank') }
                        );
                    }
                }
            } catch (e) {}
        }

        loadSettings() {
            const savedSettings = localStorage.getItem('kawaiiSettings');
            return savedSettings ? JSON.parse(savedSettings) : {
                autoGuess: false,
                guessSpeed: 1000,
                customWords: false,
                autoKick: false,
                noKickCooldown: false,
                chatBypassCensorship: false,
                drawSpeed: 120,
                position: null
            };
        }

        saveSettings() {
            const settings = {
                autoGuess: this.elements.autoGuessCheckbox.checked,
                guessSpeed: parseInt(this.elements.guessSpeed.value),
                customWords: this.elements.customWordsCheckbox.checked,
                autoKick: this.elements.autoKickCheckbox.checked,
                noKickCooldown: this.elements.noKickCooldownCheckbox.checked,
                chatBypassCensorship: this.elements.chatBypassCensorship.checked,
                drawSpeed: parseInt(this.elements.drawSpeed.value),
                position: {
                    x: this.state.xOffset,
                    y: this.state.yOffset
                }
            };
            localStorage.setItem('kawaiiSettings', JSON.stringify(settings));
        }

        localize(key, params = {}) {
            let text = this.translations[this.currentLang][key] || key;
            for (const [param, value] of Object.entries(params)) {
                text = text.replace(`\${${param}}`, value);
            }
            return text;
        }

        showNotification(message, duration = 3000, button = null) {
            const notification = document.createElement('div');
            notification.className = 'kawaii-notification';

            let notificationHTML = `
            <span class="kawaii-notification-icon">✧</span>
            <span class="kawaii-notification-text">${message}</span>
            <button class="kawaii-notification-close">✕</button>
            `;

            if (button) {
                notificationHTML = `
                <span class="kawaii-notification-icon">✧</span>
                <span class="kawaii-notification-text">${message}</span>
                <button class="kawaii-notification-button">${button.text}</button>
                <button class="kawaii-notification-close">✕</button>
                `;
            }

            notification.innerHTML = notificationHTML;
            this.elements.notifications.appendChild(notification);
            setTimeout(() => notification.classList.add('show'), 10);

            const timeout = setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);

            notification.querySelector('.kawaii-notification-close').addEventListener('click', () => {
                clearTimeout(timeout);
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            });

            if (button) {
                notification.querySelector('.kawaii-notification-button').addEventListener('click', () => {
                    button.action();
                    clearTimeout(timeout);
                    notification.classList.remove('show');
                    setTimeout(() => notification.remove(), 300);
                });
            }
        }

        setup() {
            this.interceptScripts();
            this.injectFonts();
            this.waitForBody(() => {
                this.injectHTML();
                this.cacheElements();
                this.setInitialPosition();
                this.applySavedSettings();
                this.checkForUpdates();
                this.addStyles();
                this.bindEvents();
                this.#roomDetector();
            });
        }
        #roomDetector(){this.#onElementAdded("div#screenRoom",$=>{((_,__,$$,___)=>{__=_=>{($$=_?.stateNode?.props?.children?.[0]?._owner?.stateNode)&&$$?._game&&(this.#game=$$._game,this.#chat=$$._chatElem,this.#answer=$$._answerElem,this.#joinedRoom()),_?.child&&__(_.child)};for(___ in $)/^__r/.test(___)&&__($[___])})()},1)}
        interceptScripts() {
            const roomScript = `https://cdn.jsdelivr.net/gh/GameSketchers/Kawaii-Helper@${GM_info.script.version}/GameSource/room.js`;
            const createScript = `https://cdn.jsdelivr.net/gh/GameSketchers/Kawaii-Helper@${GM_info.script.version}/GameSource/create.js`;

            function downloadFileSync(url) {
                const request = new XMLHttpRequest();
                request.open("GET", url, false);
                request.send();
                return request.status === 200 ? request.response : null;
            }

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes) {
                        Array.from(mutation.addedNodes).forEach((node) => {
                            if (node.nodeName.toLowerCase() === 'script' && node.src && node.src.includes('room') && !node.src.includes('rooms')) {
                                node.remove();
                                node.src = '';
                                node.textContent = '';
                                const newScript = downloadFileSync(roomScript);
                                window.kawaiiHelper = this;
                                Function(newScript)();
                            } else if (node.nodeName.toLowerCase() === 'script' && node.src && node.src.includes('create')) {
                                node.remove();
                                node.src = '';
                                node.textContent = '';
                                const newScript = downloadFileSync(createScript);
                                window.kawaiiHelper = this;
                                Function(newScript)();
                            }
                        });
                    }
                });
            });

            observer.observe(document, { childList: true, subtree: true });
        }

        injectFonts() {
            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap';
            document.head.appendChild(fontLink);
        }

        waitForBody(callback) {
            const interval = setInterval(() => {
                if (document.body) {
                    clearInterval(interval);
                    callback();
                }
            }, 100);
        }

        injectHTML() {
            const kawaiiHTML = `
        <div class="kawaii-cheat" id="kawaiiCheat">
            <div class="kawaii-header" id="kawaiiHeader">
                <img src="https://cdn.jsdelivr.net/gh/GameSketchers/Kawaii-Helper@refs/heads/main/Assets/kawaii-logo.png" alt="Anime Girl" class="header-icon">
                <h2 data-translate="✧ Kawaii Helper ✧">✧ Kawaii Helper ✧</h2>
                <button class="minimize-btn" id="minimizeBtn">▼</button>
            </div>
            <div class="kawaii-body" id="kawaiiBody">
                <div class="kawaii-tabs">
                    <button class="kawaii-tab active" data-tab="guessing" data-translate="Guessing">Guessing</button>
                    <button class="kawaii-tab" data-tab="drawing" data-translate="Drawing">Drawing</button>
                    <button class="kawaii-tab" data-tab="settings" data-translate="Settings">Settings</button>
                </div>
                <div class="kawaii-content" id="guessing-tab">
                    <div class="checkbox-container">
                        <input type="checkbox" id="autoGuess">
                        <label for="autoGuess" data-translate="Auto Guess">Auto Guess</label>
                    </div>
                    <div class="slider-container" id="speedContainer" style="display: none;">
                        <div class="slider-label" data-translate="Speed">Speed</div>
                        <div class="custom-slider">
                            <input type="range" id="guessSpeed" min="100" max="5000" value="1000" step="100">
                            <div class="slider-track"></div>
                            <span id="speedValue">1s</span>
                        </div>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="customWords">
                        <label for="customWords" data-translate="Custom Words">Custom Words</label>
                    </div>
                    <div class="dropzone-container" id="wordListContainer" style="display: none;">
                        <div class="dropzone" id="wordListDropzone">
                            <input type="file" id="wordList" accept=".txt">
                            <div class="dropzone-content">
                                <div class="dropzone-icon">❀</div>
                                <p data-translate="Drop word list here or click to upload">Drop word list here or click to upload</p>
                            </div>
                        </div>
                    </div>
                    <div class="input-container">
                        <input type="text" id="guessPattern" data-translate-placeholder="Enter pattern (e.g., ___e___)" placeholder="Enter pattern (e.g., ___e___)">
                    </div>
                    <div class="hit-list" id="hitList">
                        <div class="message" data-translate="Type a pattern to see matches ✧">Type a pattern to see matches ✧</div>
                    </div>
                </div>
                <div class="kawaii-content" id="drawing-tab" style="display: none;">
                    <div class="dropzone-container">
                        <div class="dropzone" id="imageDropzone">
                            <input type="file" id="imageUpload" accept="image/*">
                            <div class="dropzone-content">
                                <div class="dropzone-icon">✎</div>
                                <p data-translate="Drop image here or click to upload">Drop image here or click to upload</p>
                            </div>
                        </div>
                        <div class="image-preview" id="imagePreview" style="display: none;">
                            <img id="previewImg">
                            <div class="preview-controls">
                                <button class="cancel-btn" id="cancelImage">✕</button>
                            </div>
                        </div>
                    </div>
                    <button class="google-search-btn" id="googleSearchBtn" data-translate="Search on Google Images 🡵">Search on Google Images 🡵</button>
                    <div class="input-container">
                        <input type="text" id="textToDraw" data-translate-placeholder="Text To Draw" placeholder="Enter text to draw (I'm Using Kawaii Helper!)">
                    </div>
                    <div class="slider-container">
                        <div class="slider-label" data-translate="Draw Speed">Draw Speed</div>
                        <div class="custom-slider">
                            <input type="range" id="drawSpeed" min="120" max="1200" value="120" step="5">
                            <div class="slider-track"></div>
                            <span id="drawSpeedValue">110ms</span>
                        </div>
                    </div>
                    <div class="draw-buttons">
                        <button class="draw-btn" id="startDraw" disabled data-translate="Draw Now ✧">Draw Now ✧</button>
                        <button class="draw-btn" id="pauseDraw" disabled data-translate="Pause">Pause</button>
                        <button class="draw-btn" id="resumeDraw" disabled data-translate="Resume">Resume</button>
                        <button class="draw-btn" id="resetDraw" disabled data-translate="Reset">Reset</button>
                    </div>
                </div>
                <div class="kawaii-content" id="settings-tab" style="display: none;">
                    <div class="checkbox-container">
                        <input type="checkbox" id="autoKick">
                        <label for="autoKick" data-translate="Auto Kick">Auto Kick</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="noKickCooldown">
                        <label for="noKickCooldown" data-translate="No Kick Cooldown">No Kick Cooldown</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="chatBypassCensorship">
                        <label for="chatBypassCensorship" data-translate="Chat Bypass Censorship">Chat Bypass Censorship</label>
                    </div>
                </div>
                <div class="kawaii-footer">
                    <span class="credit-text" data-translate="Made with ♥ by Anonimbiri & GameSketchers">Made with ♥ by Anonimbiri & GameSketchers</span>
                </div>
            </div>
        </div>
        <div class="kawaii-notifications" id="kawaiiNotifications"></div>
    `;
            document.body.insertAdjacentHTML('beforeend', kawaiiHTML);
        }

        cacheElements() {
            this.elements = {
                kawaiiCheat: document.getElementById('kawaiiCheat'),
                kawaiiHeader: document.getElementById('kawaiiHeader'),
                minimizeBtn: document.getElementById('minimizeBtn'),
                tabButtons: document.querySelectorAll('.kawaii-tab'),
                tabContents: document.querySelectorAll('.kawaii-content'),
                autoGuessCheckbox: document.getElementById('autoGuess'),
                speedContainer: document.getElementById('speedContainer'),
                guessSpeed: document.getElementById('guessSpeed'),
                speedValue: document.getElementById('speedValue'),
                customWordsCheckbox: document.getElementById('customWords'),
                wordListContainer: document.getElementById('wordListContainer'),
                wordListDropzone: document.getElementById('wordListDropzone'),
                wordListInput: document.getElementById('wordList'),
                guessPattern: document.getElementById('guessPattern'),
                hitList: document.getElementById('hitList'),
                imageDropzone: document.getElementById('imageDropzone'),
                imageUpload: document.getElementById('imageUpload'),
                imagePreview: document.getElementById('imagePreview'),
                previewImg: document.getElementById('previewImg'),
                cancelImage: document.getElementById('cancelImage'),
                textToDraw: document.getElementById('textToDraw'),
                googleSearchBtn: document.getElementById('googleSearchBtn'),
                drawSpeed: document.getElementById('drawSpeed'),
                drawSpeedValue: document.getElementById('drawSpeedValue'),
                startDraw: document.getElementById('startDraw'),
                pauseDraw: document.getElementById('pauseDraw'),
                resumeDraw: document.getElementById('resumeDraw'),
                resetDraw: document.getElementById('resetDraw'),
                autoKickCheckbox: document.getElementById('autoKick'),
                noKickCooldownCheckbox: document.getElementById('noKickCooldown'),
                chatBypassCensorship: document.getElementById('chatBypassCensorship'),
                notifications: document.getElementById('kawaiiNotifications')
            };
        }

        setInitialPosition() {
            const waitForRender = () => {
                if (this.elements.kawaiiCheat.offsetWidth > 0 && this.elements.kawaiiCheat.offsetHeight > 0) {
                    const savedPosition = this.settings.position;
                    let initialX, initialY;

                    if (savedPosition && savedPosition.x !== null && savedPosition.y !== null) {
                        initialX = savedPosition.x;
                        initialY = savedPosition.y;
                    } else {
                        const windowWidth = window.innerWidth;
                        const windowHeight = window.innerHeight;
                        const cheatWidth = this.elements.kawaiiCheat.offsetWidth;
                        const cheatHeight = this.elements.kawaiiCheat.offsetHeight;
                        initialX = (windowWidth - cheatWidth) / 2;
                        initialY = (windowHeight - cheatHeight) / 2;
                    }

                    this.elements.kawaiiCheat.style.left = `${initialX}px`;
                    this.elements.kawaiiCheat.style.top = `${initialY}px`;
                    this.state.xOffset = initialX;
                    this.state.yOffset = initialY;
                    this.elements.kawaiiCheat.classList.add('twirl-minimize');
                    this.saveSettings();
                } else {
                    requestAnimationFrame(waitForRender);
                }
            };
            requestAnimationFrame(waitForRender);
        }

        applySavedSettings() {
            this.elements.autoGuessCheckbox.checked = this.settings.autoGuess;
            this.elements.guessSpeed.value = this.settings.guessSpeed;
            this.elements.customWordsCheckbox.checked = this.settings.customWords;
            this.elements.autoKickCheckbox.checked = this.settings.autoKick;
            this.elements.noKickCooldownCheckbox.checked = this.settings.noKickCooldown;
            this.elements.chatBypassCensorship.checked = this.settings.chatBypassCensorship;
            this.elements.drawSpeed.value = this.settings.drawSpeed;

            this.elements.speedContainer.style.display = this.settings.autoGuess ? 'flex' : 'none';
            this.elements.wordListContainer.style.display = this.settings.customWords ? 'block' : 'none';
            this.updateGuessSpeed({ target: this.elements.guessSpeed });
            this.updateDrawSpeed({ target: this.elements.drawSpeed });
        }

        addStyles() {
            const style = document.createElement('style');
            style.textContent = `
         :root {
            --primary-color: #FF69B4;
            --primary-dark: #FF1493;
            --primary-light: #FFC0CB;
            --bg-color: #FFB6C1;
            --text-color: #5d004f;
            --panel-bg: rgba(255, 182, 193, 0.95);
            --panel-border: #FF69B4;
            --element-bg: rgba(255, 240, 245, 0.7);
            --element-hover: rgba(255, 240, 245, 0.9);
            --element-active: #FF69B4;
            --element-active-text: #FFF0F5;
        }

        .kawaii-cheat {
            position: fixed;
            width: 280px;
            background: var(--panel-bg);
            border-radius: 15px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            color: var(--text-color);
            user-select: none;
            z-index: 1000;
            font-family: 'M PLUS Rounded 1c', sans-serif;
            border: 2px solid var(--panel-border);
            transition: height 0.4s ease-in-out, opacity 0.4s ease-in-out;
            max-height: calc(100vh - 40px);
            overflow: hidden;
            opacity: 0;
        }

        .kawaii-cheat.comet-enter {
            animation: cometEnter 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes cometEnter {
            0% { opacity: 0; transform: translateY(-80px) translateX(50px) scale(0.6); filter: brightness(1.5); }
            50% { opacity: 0.8; transform: translateY(15px) translateX(-10px) scale(1.08); filter: brightness(1.2); }
            75% { transform: translateY(-8px) translateX(5px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) translateX(0) scale(1); filter: brightness(1); }
        }

        .kawaii-cheat.minimized {
            height: 50px;
            opacity: 0.85;
            overflow: hidden;
            animation: cometMinimize 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes cometMinimize {
            0% { transform: scale(1); }
            30% { transform: scale(0.92); }
            60% { transform: scale(0.88) translateY(5px); }
            100% { transform: scale(0.85) translateY(10px); }
        }

        .kawaii-cheat:not(.minimized) {
            opacity: 1;
            animation: cometMaximize 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes cometMaximize {
            0% { transform: scale(0.85) translateY(10px); }
            60% { transform: scale(1.05) translateY(-5px); }
            80% { transform: scale(0.98) translateY(2px); }
            100% { transform: scale(1) translateY(0); }
        }

        .kawaii-cheat.minimized .kawaii-body {
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: opacity 0.2s ease-in-out, max-height 0.4s ease-in-out;
        }

        .kawaii-cheat:not(.minimized) .kawaii-body {
            opacity: 1;
            max-height: 500px;
            transition: opacity 0.2s ease-in-out 0.2s, max-height 0.4s ease-in-out;
        }

        .kawaii-cheat.dragging {
            opacity: 0.8;
            transition: none;
        }

        .kawaii-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            cursor: move;
            background: var(--element-bg);
            border-radius: 10px;
            border: 2px solid var(--primary-color);
        }

        .header-icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            object-fit: cover;
            object-position: top;
            border: 1px dashed var(--primary-color);
        }

        .kawaii-header h2 {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            color: var(--primary-dark);
            text-shadow: 1px 1px 2px var(--primary-light);
        }

        .minimize-btn {
            background: transparent;
            border: 1px dashed var(--primary-dark);
            border-radius: 6px;
            width: 24px;
            height: 24px;
            color: var(--primary-dark);
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .minimize-btn:hover {
            background: var(--primary-color);
            color: var(--element-active-text);
            border-color: var(--primary-color);
            transform: rotate(180deg);
        }

        .kawaii-tabs {
            display: flex;
            gap: 8px;
            padding: 5px 0;
        }

        .kawaii-tab {
            flex: 1;
            background: var(--element-bg);
            border: 1px dashed var(--primary-color);
            padding: 6px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 700;
            color: var(--text-color);
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease;
            text-align: center;
        }

        .kawaii-tab.active {
            background: var(--primary-color);
            color: var(--element-active-text);
            border-color: var(--primary-dark);
        }

        .kawaii-tab:hover:not(.active) {
            background: var(--element-hover);
            transform: scale(1.05);
        }

        .kawaii-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-height: 0;
            flex-grow: 1;
            overflow: hidden;
            padding: 5px;
        }

        .checkbox-container {
            display: flex;
            align-items: center;
            gap: 8px;
            background: var(--element-bg);
            padding: 8px;
            border-radius: 10px;
            border: 1px dashed var(--primary-color);
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .checkbox-container:hover {
            background: var(--element-hover);
        }

        .checkbox-container input[type="checkbox"] {
            appearance: none;
            width: 18px;
            height: 18px;
            background: var(--element-active-text);
            border: 1px dashed var(--primary-color);
            border-radius: 50%;
            cursor: pointer;
            position: relative;
        }

        .checkbox-container input[type="checkbox"]:checked {
            background: var(--primary-color);
            border-color: var(--primary-dark);
        }

        .checkbox-container input[type="checkbox"]:checked::after {
            content: "♥";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--element-active-text);
            font-size: 12px;
        }

        .checkbox-container label {
            font-size: 12px;
            font-weight: 700;
            color: var(--text-color);
            cursor: pointer;
        }

        .input-container {
            background: var(--element-bg);
            padding: 8px;
            border-radius: 10px;
            border: 1px dashed var(--primary-color);
        }

        .input-container input[type="text"] {
            width: 100%;
            background: var(--element-active-text);
            border: 1px dashed var(--primary-light);
            border-radius: 8px;
            padding: 6px 10px;
            color: var(--text-color);
            font-size: 12px;
            font-weight: 500;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
            outline: none;
        }

        .input-container input[type="text"]:focus {
            border-color: var(--primary-dark);
        }

        .dropzone-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .dropzone {
            position: relative;
            background: var(--element-bg);
            border: 1px dashed var(--primary-color);
            border-radius: 10px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.3s ease, border-color 0.3s ease;
            min-height: 80px;
        }

        .dropzone:hover, .dropzone.drag-over {
            background: var(--element-hover);
            border-color: var(--primary-dark);
        }

        .dropzone input[type="file"] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .dropzone-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            text-align: center;
            pointer-events: none;
        }

        .dropzone-icon {
            font-size: 24px;
            color: var(--primary-color);
            animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .dropzone-content p {
            margin: 0;
            color: var(--text-color);
            font-size: 12px;
            font-weight: 500;
        }

        .slider-container {
            display: flex;
            flex-direction: column;
            gap: 6px;
            background: var(--element-bg);
            padding: 8px;
            border-radius: 10px;
            border: 1px dashed var(--primary-color);
        }

        .slider-label {
            font-size: 12px;
            color: var(--text-color);
            font-weight: 700;
            text-align: center;
        }

        .custom-slider {
            position: relative;
            height: 25px;
            padding: 0 8px;
        }

        .custom-slider input[type="range"] {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            background: transparent;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            z-index: 2;
        }

        .custom-slider .slider-track {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 6px;
            background: linear-gradient(to right, var(--primary-dark) 0%, var(--primary-dark) var(--slider-progress), var(--primary-light) var(--slider-progress), var(--primary-light) 100%);
            border-radius: 3px;
            transform: translateY(-50%);
            z-index: 1;
        }

        .custom-slider input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background: var(--primary-color);
            border-radius: 50%;
            border: 1px dashed var(--element-active-text);
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .custom-slider input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
        }

        .custom-slider span {
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            color: var(--text-color);
            background: var(--element-active-text);
            padding: 2px 6px;
            border-radius: 8px;
            border: 1px dashed var(--primary-color);
            white-space: nowrap;
        }

        .hit-list {
            max-height: 180px;
            min-height: 40px;
            overflow-y: auto;
            background: var(--element-bg);
            border: 1px dashed var(--primary-color);
            border-radius: 10px;
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            scrollbar-width: thin;
            scrollbar-color: var(--primary-color) var(--element-bg);
            box-sizing: border-box;
        }

        .hit-list:empty {
            min-height: 40px;
            overflow-y: hidden;
        }

        .hit-list::-webkit-scrollbar {
            width: 6px;
        }

        .hit-list::-webkit-scrollbar-thumb {
            background-color: var(--primary-color);
            border-radius: 10px;
        }

        .hit-list::-webkit-scrollbar-track {
            background: var(--element-bg);
        }

        .hit-list button {
            background: rgba(255, 240, 245, 0.8);
            border: 1px dashed var(--primary-color);
            padding: 8px 10px;
            border-radius: 8px;
            color: var(--text-color);
            font-size: 12px;
            font-weight: 700;
            line-height: 1.5;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            text-align: left;
            box-sizing: border-box;
            min-height: 32px;
        }

        .hit-list button:before {
            content: '';
            position: absolute;
            left: -100%;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, var(--primary-light), transparent);
            transition: all 0.5s ease;
            z-index: 0;
        }

        .hit-list button:hover:not(.tried):before {
            left: 100%;
        }

        .hit-list button:hover:not(.tried) {
            background: var(--primary-dark);
            color: var(--element-active-text);
            box-shadow: 0 0 15px rgba(255, 105, 180, 0.5);
        }

        .hit-list button span {
            position: relative;
            z-index: 1;
        }

        .hit-list button.tried {
            background: rgba(255, 182, 193, 0.6);
            border-color: var(--primary-light);
            color: var(--primary-dark);
            opacity: 0.7;
            cursor: not-allowed;
        }

        .hit-list .tried-label {
            font-size: 10px;
            color: var(--primary-dark);
            text-align: center;
            padding: 4px;
            background: var(--element-active-text);
            border-radius: 8px;
            border: 1px dashed var(--primary-color);
        }

        .hit-list .message {
            font-size: 12px;
            color: var(--text-color);
            text-align: center;
            padding: 8px;
        }

        .image-preview {
            position: relative;
            margin-top: 10px;
            background: var(--element-bg);
            padding: 8px;
            border-radius: 10px;
            border: 1px dashed var(--primary-color);
        }

        .image-preview img {
            max-width: 100%;
            max-height: 120px;
            border-radius: 8px;
            display: block;
            margin: 0 auto;
        }

        .preview-controls {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            gap: 6px;
        }

        .cancel-btn {
            background: transparent;
            border: 1px dashed var(--primary-dark);
            border-radius: 6px;
            width: 24px;
            height: 24px;
            color: var(--primary-dark);
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .cancel-btn:hover {
            background: var(--primary-dark);
            color: var(--element-active-text);
            transform: scale(1.1);
        }

        .draw-btn {
            background: var(--primary-color);
            border: 1px dashed var(--primary-dark);
            padding: 8px;
            border-radius: 10px;
            color: var(--element-active-text);
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            text-align: center;
            width: 100%;
            box-sizing: border-box;
        }

        .draw-btn:before {
            content: '';
            position: absolute;
            left: -100%;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, var(--primary-light), transparent);
            transition: all 0.5s ease;
        }

        .draw-btn:hover:not(:disabled):before {
            left: 100%;
        }

        .draw-btn:hover:not(:disabled) {
            background: var(--primary-dark);
            box-shadow: 0 0 15px rgba(255, 105, 180, 0.5);
        }

        .draw-btn:disabled {
            background: rgba(255, 105, 180, 0.5);
            cursor: not-allowed;
        }

        .kawaii-footer {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            padding: 6px;
            background: var(--element-bg);
            border-radius: 10px;
            border: 2px solid var(--primary-color);
        }

        .credit-text {
            font-size: 10px;
            color: var(--text-color);
            font-weight: 700;
        }

        .kawaii-notifications {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 2000;
            pointer-events: none;
        }

        .kawaii-notification {
            background: var(--panel-bg);
            border: 2px solid var(--panel-border);
            border-radius: 12px;
            padding: 12px 18px;
            color: var(--text-color);
            font-family: 'M PLUS Rounded 1c', sans-serif;
            font-size: 14px;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: auto;
            gap: 8px;
            padding: 12px 12px;
        }

        .kawaii-notification.show {
            opacity: 1;
            transform: translateX(0);
        }

        .kawaii-notification-icon {
            font-size: 20px;
            color: var(--primary-dark);
            animation: bounce 1s infinite ease-in-out;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        .kawaii-notification-button {
            background: var(--primary-color);
            border: 1px dashed var(--primary-dark);
            border-radius: 6px;
            padding: 4px 8px;
            color: var(--element-active-text);
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .kawaii-notification-button:hover {
            background: var(--primary-dark);
            transform: scale(1.05);
        }

        .kawaii-notification-close {
            background: transparent;
            border: 1px dashed var(--primary-dark);
            border-radius: 6px;
            width: 20px;
            height: 20px;
            color: var(--primary-dark);
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-left: auto;
        }

        .kawaii-notification-close:hover {
            background: var(--primary-dark);
            color: var(--element-active-text);
            transform: scale(1.1);
        }

        .google-search-btn {
            background: var(--primary-color);
            border: 1px dashed var(--primary-dark);
            border-radius: 8px;
            padding: 6px 10px;
            color: var(--element-active-text);
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            width: 100%;
            box-sizing: border-box;
            height: 30px;
            text-align: center;
        }

        .google-search-btn:before {
            content: '';
            position: absolute;
            left: -100%;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, var(--primary-light), transparent);
            transition: all 0.5s ease;
        }

        .google-search-btn:hover:not(:disabled):before {
            left: 100%;
        }

        .google-search-btn:hover:not(:disabled) {
            background: var(--primary-dark);
            box-shadow: 0 0 15px rgba(255, 105, 180, 0.5);
        }

        .google-search-btn:disabled {
            background: rgba(255, 105, 180, 0.5);
            cursor: not-allowed;
        }
        .draw-buttons{
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }
        .draw-btn:disabled {
            pointer-events: none;
            display: none;
        }`;
            document.head.appendChild(style);
            this.updateLanguage();
            [this.elements.guessSpeed, this.elements.drawSpeed].forEach(this.updateSliderTrack.bind(this));
        }

        updateLanguage() {
            document.querySelectorAll('[data-translate]').forEach(element => {
                element.textContent = this.localize(element.getAttribute('data-translate'));
            });
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                element.setAttribute('placeholder', this.localize(element.getAttribute('data-translate-placeholder')));
            });
        }

        updateSliderTrack(slider) {
            const min = parseInt(slider.min);
            const max = parseInt(slider.max);
            const value = parseInt(slider.value);
            const progress = ((value - min) / (max - min)) * 100;
            slider.parentElement.querySelector('.slider-track').style.setProperty('--slider-progress', `${progress}%`);
        }

        preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        bindEvents() {
            this.elements.kawaiiHeader.addEventListener('mousedown', this.startDragging.bind(this));
            document.addEventListener('mousemove', this.drag.bind(this));
            document.addEventListener('mouseup', this.stopDragging.bind(this));
            this.elements.minimizeBtn.addEventListener('click', this.toggleMinimize.bind(this));
            this.elements.tabButtons.forEach(btn => btn.addEventListener('click', this.switchTab.bind(this, btn)));

            document.querySelectorAll('.checkbox-container').forEach(container => {
                const checkbox = container.querySelector('input[type="checkbox"]');
                const label = container.querySelector('label');
                container.addEventListener('click', e => {
                    if (e.target !== checkbox && e.target !== label) {
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
                label.addEventListener('click', e => e.stopPropagation());
            });

            this.elements.autoGuessCheckbox.addEventListener('change', (e) => {
                this.toggleAutoGuess(e);
                this.saveSettings();
            });
            this.elements.guessSpeed.addEventListener('input', (e) => {
                this.updateGuessSpeed(e);
                this.saveSettings();
            });
            this.elements.customWordsCheckbox.addEventListener('change', (e) => {
                this.toggleCustomWords(e);
                this.saveSettings();
            });
            this.elements.guessPattern.addEventListener('input', e => this.updateHitList(e.target.value.trim()));
            this.elements.hitList.addEventListener('click', this.handleHitListClick.bind(this));
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                this.elements.wordListDropzone.addEventListener(eventName, this.preventDefaults, false);
                this.elements.imageDropzone.addEventListener(eventName, this.preventDefaults, false);
            });
            this.elements.wordListDropzone.addEventListener('dragenter', () => this.elements.wordListDropzone.classList.add('drag-over'));
            this.elements.wordListDropzone.addEventListener('dragover', () => this.elements.wordListDropzone.classList.add('drag-over'));
            this.elements.wordListDropzone.addEventListener('dragleave', () => this.elements.wordListDropzone.classList.remove('drag-over'));
            this.elements.wordListDropzone.addEventListener('drop', this.handleWordListDrop.bind(this));
            this.elements.wordListInput.addEventListener('change', this.handleWordListInput.bind(this));
            this.elements.imageDropzone.addEventListener('dragenter', () => this.elements.imageDropzone.classList.add('drag-over'));
            this.elements.imageDropzone.addEventListener('dragover', () => this.elements.imageDropzone.classList.add('drag-over'));
            this.elements.imageDropzone.addEventListener('dragleave', () => this.elements.imageDropzone.classList.remove('drag-over'));
            this.elements.imageDropzone.addEventListener('drop', this.handleImageDrop.bind(this));
            this.elements.imageUpload.addEventListener('change', this.handleImageInput.bind(this));
            this.elements.cancelImage.addEventListener('click', this.cancelImagePreview.bind(this));
            this.elements.googleSearchBtn.addEventListener('click', () => {
                if (!window.game || !window.game._palavra || !window.game.turn) {
                    this.showNotification(this.localize("Game not ready or not your turn! ✧"), 3000);
                    return;
                }
                const word = window.game._palavra;
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(word)}+vectorial&tbm=isch`;
                window.open(searchUrl, '_blank');
            });
            this.elements.drawSpeed.addEventListener('input',(e)=>{
                this.#drawState.speed = parseInt(e.target.value);
                this.updateDrawSpeed(e);
                this.saveSettings();
            });
            this.elements.startDraw.addEventListener('click', () => {
                this.#drawState.commands.length === 0
                    ? (text => text && this.#drawText(text))(this.elements.textToDraw?.value?.trim())
                : this.#startDrawing();
                this.updateDrawButtons();
            });
            this.elements.pauseDraw.addEventListener('click', () => {
                this.#pauseDrawing();
                this.updateDrawButtons();
            });
            this.elements.resumeDraw.addEventListener('click', () => {
                this.#resumeDrawing();
                this.updateDrawButtons();
            });
            this.elements.resetDraw.addEventListener('click', () => {
                this.elements.previewImg.src = '';
                this.elements.imageDropzone.style.display = 'flex';
                this.elements.imagePreview.style.display = 'none';
                this.#resetDrawing();
                this.updateDrawButtons();
            });
            this.elements.autoKickCheckbox.addEventListener('change', () => {
                this.showNotification(`Auto Kick: ${this.elements.autoKickCheckbox.checked ? 'Enabled' : 'Disabled'}`, 2000);
                this.saveSettings();
            });
            this.elements.noKickCooldownCheckbox.addEventListener('change', () => {
                this.showNotification(`No Kick Cooldown: ${this.elements.noKickCooldownCheckbox.checked ? 'Enabled' : 'Disabled'}`, 2000);
                this.saveSettings();
            });
            this.elements.chatBypassCensorship.addEventListener('change', () => {
                this.showNotification(`Chat Bypass Censorship: ${this.elements.chatBypassCensorship.checked ? 'Enabled' : 'Disabled'}`, 2000);
                this.saveSettings();
            });

            window.addEventListener('resize', () => {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const cheatWidth = this.elements.kawaiiCheat.offsetWidth;
                const cheatHeight = this.elements.kawaiiCheat.offsetHeight;

                let newX = this.state.xOffset;
                let newY = this.state.yOffset;

                newX = Math.max(0, Math.min(newX, windowWidth - cheatWidth));
                newY = Math.max(0, Math.min(newY, windowHeight - cheatHeight));

                if (newX !== this.state.xOffset || newY !== this.state.yOffset) {
                    this.state.xOffset = newX;
                    this.state.yOffset = newY;
                    this.elements.kawaiiCheat.style.left = `${newX}px`;
                    this.elements.kawaiiCheat.style.top = `${newY}px`;
                    this.saveSettings();
                }
            });
        }
        #joinedRoom() {
            this.#drawState.socket = window.game._socket;
            this.#drawState.id = window.game._codigo;
            this.#myTurnDrawing = false;
            const origInicioVez = [...window.game._events.inicioVez];
            window.game._events.inicioVez = [function(...args) {
                this.#myTurnDrawing = true;
                origInicioVez.forEach(fn => fn.apply(this, args));
            }.bind(this), ...origInicioVez.slice(1)];
            const origFimRodada = [...window.game._events.fimRodada];
            window.game._events.fimRodada = [function(...args) {
                if (this.#myTurnDrawing) {
                    this.#myTurnDrawing = false;
                    this.#resetDrawing();
                    this.updateDrawButtons();
                }
                origFimRodada.forEach(fn => fn.apply(this, args));
            }.bind(this), ...origFimRodada.slice(1)];
            const currentTheme = window.game._dadosSala.tema || "Custom";
            if (currentTheme !== "Custom") {
                this.fetchWordList(currentTheme).then(() => this.updateHitList(this.elements.guessPattern.value.trim()));
            }
        }
        cancelImagePreview(){
            this.elements.previewImg.src = '';
            this.elements.imageDropzone.style.display = 'flex';
            this.elements.imagePreview.style.display = 'none';
            this.updateDrawButtons();
        }
        updateDrawButtons() {
            const { startDraw, pauseDraw, resumeDraw, resetDraw } = this.elements;
            const hasCommands = this.#drawState.commands.length > 0;
            const isRunning = this.#drawState.running;
            const isPaused = this.#drawState.paused;
            startDraw.disabled = isRunning;
            pauseDraw.disabled = !isRunning || isPaused;
            resumeDraw.disabled = !isPaused;
            resetDraw.disabled = !isRunning && !isPaused && !hasCommands;
        }
        startDragging(e) {
            if (e.target !== this.elements.minimizeBtn) {
                this.state.initialX = e.clientX - this.state.xOffset;
                this.state.initialY = e.clientY - this.state.yOffset;
                this.state.isDragging = true;
                this.elements.kawaiiCheat.classList.add('dragging');
                if (this.state.rafId) cancelAnimationFrame(this.state.rafId);
            }
        }

        drag(e) {
            if (!this.state.isDragging) return;
            e.preventDefault();
            const newX = e.clientX - this.state.initialX;
            const newY = e.clientY - this.state.initialY;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const cheatWidth = this.elements.kawaiiCheat.offsetWidth;
            const cheatHeight = this.elements.kawaiiCheat.offsetHeight;

            const clampedX = Math.max(0, Math.min(newX, windowWidth - cheatWidth));
            const clampedY = Math.max(0, Math.min(newY, windowHeight - cheatHeight));

            if (this.state.rafId) cancelAnimationFrame(this.state.rafId);
            this.state.rafId = requestAnimationFrame(() => {
                this.elements.kawaiiCheat.style.left = `${clampedX}px`;
                this.elements.kawaiiCheat.style.top = `${clampedY}px`;
                this.state.xOffset = clampedX;
                this.state.yOffset = clampedY;
                this.saveSettings();
            });
        }

        stopDragging() {
            if (this.state.isDragging) {
                this.state.isDragging = false;
                this.elements.kawaiiCheat.classList.remove('dragging');
                if (this.state.rafId) cancelAnimationFrame(this.state.rafId);
                this.saveSettings();
            }
        }

        toggleMinimize() {
            this.elements.kawaiiCheat.classList.toggle('minimized');
            this.elements.minimizeBtn.textContent = this.elements.kawaiiCheat.classList.contains('minimized') ? '▲' : '▼';
        }

        switchTab(btn) {
            this.elements.tabButtons.forEach(b => b.classList.remove('active'));
            this.elements.tabContents.forEach(c => c.style.display = 'none');
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).style.display = 'flex';
        }

        toggleAutoGuess(e) {
            this.elements.speedContainer.style.display = e.target.checked ? 'flex' : 'none';
            if (!e.target.checked) this.stopAutoGuess();
            else if (this.elements.guessPattern.value) this.startAutoGuess();
        }

        updateGuessSpeed(e) {
            this.updateSliderTrack(e.target);
            this.elements.speedValue.textContent = e.target.value >= 1000 ? `${e.target.value / 1000}s` : `${e.target.value}ms`;
            if (this.elements.autoGuessCheckbox.checked && this.state.autoGuessInterval) {
                this.stopAutoGuess();
                this.startAutoGuess();
            }
        }

        toggleCustomWords(e) {
            this.elements.wordListContainer.style.display = e.target.checked ? 'block' : 'none';
            this.updateHitList(this.elements.guessPattern.value.trim());
        }

        handleWordListDrop(e) {
            this.elements.wordListDropzone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'text/plain') this.handleWordListFile(file);
        }

        handleWordListInput(e) {
            const file = e.target.files[0];
            if (file) {
                this.handleWordListFile(file);
                e.target.value = '';
            }
        }

        handleWordListFile(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.wordList["Custom"] = event.target.result.split('\n').map(word => word.trim()).filter(word => word.length > 0);
                this.showNotification(this.localize("Loaded ${wordList['Custom'].length} words from ${file.name}", {
                    "wordList['Custom'].length": this.wordList["Custom"].length,
                    "file.name": file.name
                }), 4000);
                this.updateHitList(this.elements.guessPattern.value.trim());
            };
            reader.readAsText(file);
        }

        handleHitListClick(e) {
            if (e.target.tagName !== 'BUTTON' || e.target.classList.contains('tried')) return;
            const button = e.target;
            button.classList.add('tried');
            if (!this.state.triedLabelAdded && this.elements.hitList.querySelectorAll('button.tried').length === 1) {
                const triedLabel = document.createElement('div');
                triedLabel.classList.add('tried-label');
                triedLabel.textContent = this.localize("Tried Words");
                this.elements.hitList.appendChild(triedLabel);
                this.state.triedLabelAdded = true;
            }
            if (window.game && window.game._socket) {
                window.game._socket.emit(13, window.game._codigo, button.textContent);
            }
            this.elements.hitList.appendChild(button);
        }

        startAutoGuess() {
            if (!this.elements.autoGuessCheckbox.checked) return;
            this.stopAutoGuess();
            const speed = parseInt(this.elements.guessSpeed.value);
            this.state.autoGuessInterval = setInterval(() => {
                const buttons = this.elements.hitList.querySelectorAll('button:not(.tried)');
                if (buttons.length > 0 && window.game && window.game._socket) {
                    const word = buttons[0].textContent;
                    buttons[0].classList.add('tried');
                    window.game._socket.emit(13, window.game._codigo, word);
                    if (!this.state.triedLabelAdded && this.elements.hitList.querySelectorAll('button.tried').length === 1) {
                        const triedLabel = document.createElement('div');
                        triedLabel.classList.add('tried-label');
                        triedLabel.textContent = this.localize("Tried Words");
                        this.elements.hitList.appendChild(triedLabel);
                        this.state.triedLabelAdded = true;
                    }
                    this.elements.hitList.appendChild(buttons[0]);
                }
            }, speed);
        }

        stopAutoGuess() {
            if (this.state.autoGuessInterval) {
                clearInterval(this.state.autoGuessInterval);
                this.state.autoGuessInterval = null;
            }
        }

        updateHitList(pattern) {
            if (!this.elements.hitList) return;
            this.elements.hitList.innerHTML = '';
            this.state.triedLabelAdded = false;

            const activeTheme = this.elements.customWordsCheckbox.checked || !window.game || !window.game._dadosSala || !window.game._dadosSala.tema
            ? "Custom"
            : window.game._dadosSala.tema;
            const activeList = this.wordList[activeTheme] || [];

            if (!pattern) {
                if (activeList.length === 0) {
                    this.elements.hitList.innerHTML = `<div class="message">${this.localize(this.elements.customWordsCheckbox.checked ? "Upload a custom word list ✧" : "No words available ✧")}</div>`;
                } else {
                    activeList.forEach(word => {
                        const button = document.createElement('button');
                        button.textContent = word;
                        this.elements.hitList.appendChild(button);
                    });
                }
                return;
            }

            const regex = new RegExp(`^${pattern.split('').map(char => char === '_' ? '.' : char).join('')}$`, 'i');
            const matches = activeList.filter(word => regex.test(word));

            if (matches.length === 0) {
                this.elements.hitList.innerHTML = `<div class="message">${this.localize("No matches found ✧")}</div>`;
            } else {
                matches.forEach(word => {
                    const button = document.createElement('button');
                    button.textContent = word;
                    this.elements.hitList.appendChild(button);
                });
            }
        }

        async fetchWordList(theme) {
            if (!this.wordList[theme] && this.wordListURLs[theme]) {
                try {
                    const response = await fetch(this.wordListURLs[theme]);
                    if (!response.ok) throw new Error(`Failed to fetch ${theme} word list`);
                    const data = await response.json();
                    this.wordList[theme] = data.words || data;
                } catch (error) {
                    this.wordList[theme] = [];
                }
            }
        }

        handleImageDrop(e) {
            this.elements.imageDropzone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) this.handleImageFile(file);
        }

        handleImageInput(e) {
            const file = e.target.files[0];
            if (file) {
                this.handleImageFile(file);
                e.target.value = '';
            }
        }

        handleImageFile(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.elements.previewImg.src = event.target.result;
                this.elements.imageDropzone.style.display = 'none';
                this.elements.imagePreview.style.display = 'block';

                const img = new Image();
                img.onload = () => {
                    this.#processImage(img, false);
                    this.updateDrawButtons();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }

        updateDrawSpeed(e) {
            this.updateSliderTrack(e.target);
            this.elements.drawSpeedValue.textContent = e.target.value >= 1000 ? `${e.target.value / 1000}s` : `${e.target.value}ms`;
        }
        #startDrawing(){this.#drawState.running||!this.#drawState.commands.length||(this.#game._player._ativo=!0,Object.assign(this.#drawState,{seq:0,paused:!1,running:!0}),this.#sendNext())}
        #pauseDrawing(){this.#drawState.running&&(this.#drawState.paused=!0,clearTimeout(this.#drawState.timer))}
        #resumeDrawing(){this.#drawState.paused&&(this.#drawState.paused=!1,this.#sendNext())}
        #resetDrawing(){clearTimeout(this.#drawState.timer);this.#drawState.commands.length=0;this.#drawState.seq=0;this.#drawState.running=this.#drawState.paused=false}
        #loadImageFile(file){
            const reader=new FileReader();
            reader.onload=({target:{result}})=>{
                const img=new Image();
                img.onload=()=>this.#processImage(img,!1);
                img.src=result;
            };
            reader.readAsDataURL(file);
        }

        #processImage(img,forceVector=false){
            this.#resetDrawing();
            const scale = Math.min((this.#CW-2*this.#MARGIN)/img.width,(this.#CH-2*this.#MARGIN)/img.height);
            const [w,h]=[Math.max(1,Math.round(img.width*scale)),Math.max(1,Math.round(img.height*scale))];
            const tmpCanvas = Object.assign(document.createElement('canvas'),{width:w,height:h});
            const tmpCtx = tmpCanvas.getContext('2d',{willReadFrequently:!0});
            tmpCtx.imageSmoothingEnabled=!0;
            tmpCtx.drawImage(img,0,0,w,h);
            const {data}=tmpCtx.getImageData(0,0,w,h);
            let colorfulPixels=0,totalValid=0;
            for (let i=0;i<data.length;i+=16){
                data[i+3]<50||((r=data[i],g=data[i+1],b=data[i+2])=>{(r<30&&g<30&&b<30)||(r>225&&g>225&&b>225)||(totalValid++,Math.max(r,g,b)-Math.min(r,g,b)>35&&colorfulPixels++)})();
            }
            const isColor=!forceVector&&totalValid>0&&colorfulPixels/totalValid>0.12;
            const mode=isColor?'Colorful':'NoN-Colorful';
            this.#drawState.mode=mode;
            (isColor?this.#processColorFinal:this.#processVectorImage).call(this,data,w,h);
        }

        #processColorFinal(data,w,h){
            const [ox, oy] = [(this.#CW-w)/2,(this.#CH-h)/2];
            const thickness = Math.max(1,this.#drawState.thickness);
            const radius = Math.max(1,Math.floor(thickness/2));
            const palette = this.#createPalette(data,w,h,this.#COLOR_COUNT);
            const quantized = this.#quantizeImage(data,w,h,palette);
            let componentsByColor = this.#findConnectedComponents(quantized,w,h);
            this.#mergeSmallComponents(componentsByColor,quantized,w,h);
            componentsByColor = this.#findConnectedComponents(quantized,w,h);
            const eroded = this.#erodeGlobal(quantized,w,h,radius);
            const finalComponents = this.#findConnectedComponents(eroded,w,h);
            const allPaths = Object.entries(finalComponents)
            .flatMap(([color,comps])=>comps.map(comp=>({color,points:comp.points,size:comp.points.length})))
            .sort((a,b)=>b.size-a.size)
            .flatMap(comp=>{const path=this.#buildZigzagFromPoints(comp.points,thickness);return path?.length>=2?[{color:comp.color,path:path.map(p=>({x:p.x+ox,y:p.y+oy}))}]:[]});
            this.#drawState.commands=[{type:'thickness',val:thickness},...allPaths.flatMap(item=>[{type:'color',val:item.color},...(()=>{
                const simplified=this.#simplifyPath(item.path, this.#RDP_EPSILON);const chunks=[];
                for(let start=0;start<simplified.length-1;start+=this.#MAX_CHUNK-1)
                    chunks.push(...(start+this.#MAX_CHUNK>=simplified.length?[simplified.slice(start)]:[simplified.slice(start,start+this.#MAX_CHUNK)]));
                return chunks.map(chunk =>({type:'draw',val:chunk}));
            })()])];
        }

        #mergeSmallComponents(componentsByColor,quantized,w,h){
            const all = Object.entries(componentsByColor).flatMap(([color,comps])=>comps.map(c=>({color,points:c.points,size:c.points.length}))).sort((a, b) => a.size - b.size);
            for (const comp of all){
                if(comp.size >= this.#MIN_COMPONENT_SIZE) break;
                const neighborColors = new Map();
                const visited = new Set();
                for(const [x,y] of comp.points){
                    for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
                        const [nx,ny]=[x+dx,y+dy];
                        (nx<0||nx>=w||ny<0||ny>=h)||(idx=>{visited.has(idx)||(visited.add(idx),(nColor=>nColor&&nColor!==comp.color&&neighborColors.set(nColor,(neighborColors.get(nColor)??0)+1))(quantized[idx]))})(ny*w+nx);
                    }
                }
                neighborColors.size===0||((bestColor=[...neighborColors.entries()].reduce((a,b)=>b[1]>a[1]?b:a)[0])=>comp.points.forEach(([x,y])=>quantized[y*w+x]=bestColor))();
            }
        }

        #erodeGlobal(quantized,w,h,radius){
            return radius<=0?quantized.slice():Array.from({length:radius},(_,r)=>r)
                .reduce(current=>{
                const next = new Array(w*h).fill(null);
                for (let y=0;y<h;y++){
                    for (let x=0;x<w;x++){
                        const idx=y*w+x;
                        const col=current[idx];
                        col!==null&&((top,bottom,left,right)=>{top===col&&bottom===col&&left===col&&right===col&&(next[idx]=col)})(y>0?current[idx-w]:null,y<h-1?current[idx+w]:null,x>0?current[idx-1]:null,x<w-1?current[idx+1]:null);
                    }
                }
                return next;
            },quantized.slice());
        }

        #buildZigzagFromPoints(points,step) {
            points.sort((a,b)=>a[1]-b[1]||a[0]-b[0]);
            const rows=new Map();
            points.forEach(([x,y])=>(rows.has(y)||rows.set(y,[]),rows.get(y).push(x)));
            const sortedY=[...rows.keys()].sort((a,b)=>a-b);
            const gapTolerance=step;
            const {path}=sortedY.reduce((state,y)=>{
                (y-state.lastY<step)&&(()=>{})();
                return y-state.lastY<step?state:((xList=rows.get(y).sort((a,b)=>a-b))=>{
                    const runs = xList.slice(1).reduce((acc,x)=>(last=>last&&x<=last[1]+gapTolerance?(last[1]=Math.max(last[1],x),acc):[...acc,[x,x]])(acc[acc.length-1]),[[xList[0],xList[0]]]);
                    return runs.length===0?state:((firstRun=runs[0])=>{
                        const startX=state.direction===1?firstRun[0]:firstRun[1];
                        const newPath=state.prevEndX!==null?[...state.path,{x:state.prevEndX,y:state.prevEndY},{x:startX,y}]:[...state.path];
                        const {path:updatedPath,endX,endY}=runs.reduce(
                            (inner,[runLeft,runRight],r,arr)=>({path:state.direction===1
                                                                ?[...inner.path,{x:runLeft,y},{x:runRight,y}]:[...inner.path,{x:runRight,y},{x:runLeft,y}],endX:r===arr.length-1
                                                                ?(state.direction===1?runRight:runLeft):(()=>{const nextRun=arr[r+1];const nextStart=state.direction===1?nextRun[0]:nextRun[1];const bridgeX=state.direction===1?runRight:runLeft;inner.path.push({x:bridgeX,y},{x:nextStart,y});return state.direction===1?nextRun[1]:nextRun[0]})(),endY:y}),{path:newPath,endX:null,endY:null});
                        return {path:updatedPath,direction:state.direction*-1,prevEndX:endX,prevEndY:endY,lastY:y};
                    })();
                })();
            },{path:[],direction:1,prevEndX:null,prevEndY:null,lastY:-Infinity});
            return path.filter((p,i,arr)=>i===0||p.x!==arr[i-1].x||p.y!==arr[i-1].y);
        }

        #createPalette(data,w,h,colorCount){
            const pixels=[];
            for (let i=0;i<data.length;i+=4){
                const [r,g,b,a]=[data[i],data[i+1],data[i+2],data[i+3]];
                (a>=50&&(r<=this.#WHITE_THRESHOLD||g<=this.#WHITE_THRESHOLD||b<=this.#WHITE_THRESHOLD))&&pixels.push([r,g,b]);
            }
            const freqMap = new Map();
            pixels.forEach(([r,g,b])=>{
                const hex ='x'+((1<<24)+((r>>2)<<18)+((g>>2)<<10)+((b>>2)<<2)).toString(16).slice(1).toUpperCase();
                freqMap.set(hex,(freqMap.get(hex)??0)+1);
            });
            return [...freqMap.entries()].sort((a,b)=>b[1]-a[1]).slice(0,colorCount).map(e=>e[0]);
        }

        #quantizeImage(data,w,h,palette){
            const result=new Array(w*h).fill(null);
            const paletteRGB=palette.map(hex=>[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)]);
            for (let i=0,p=0;i<data.length;i+=4,p++){
                const a=data[i+3];
                (a<50)&&(result[p]=null)||
                    ((r=data[i],g=data[i+1],b=data[i+2])=>(r>this.#WHITE_THRESHOLD&&g>this.#WHITE_THRESHOLD&&b>this.#WHITE_THRESHOLD)?(result[p]=null):(result[p]=palette[
                    paletteRGB.reduce((best,[pr,pg,pb],j)=>{const dist=(r-pr)**2+(g-pg)**2+(b-pb)**2;return dist<best.dist?{dist,idx:j}:best},{dist:Infinity}).idx
                ]))();
            }
            return result;
        }

        #findConnectedComponents(quantized,w,h){
            const parent=new Int32Array(w * h).fill(-1);
            const find=i=>parent[i]===i?i:(parent[i]=find(parent[i]));
            const union=(i,j)=>{const ri=find(i),rj=find(j);ri!==rj&&(parent[ri]=rj)};
            for (let y=0;y<h;y++){
                for (let x=0;x<w;x++){
                    const idx=y*w+x;
                    const color=quantized[idx];
                    color!==null&&(parent[idx]=idx,x>0&&quantized[idx-1]===color&&union(idx,idx-1),y>0&&quantized[idx-w]===color&&union(idx,idx-w));
                }
            }
            const compMap=new Map();
            for(let y=0;y<h;y++){
                for(let x=0;x<w;x++){
                    const idx=y*w+x;
                    const color=quantized[idx];
                    color!==null&&((root=find(idx))=>{compMap.has(root)||compMap.set(root,{color,points:[]});compMap.get(root).points.push([x,y])})();
                }
            }
            return [...compMap.values()].reduce((byColor,{color,points})=>{byColor[color]??=[];byColor[color].push({points});return byColor},{});
        }

        #processVectorImage(data,w,h){
            const lum=new Float32Array(w*h);
            const binary=new Uint8Array(w*h);
            const T=this.#drawState.threshold;
            for (let i=0,p=0;i<data.length;i+=4,p++){
                lum[p]=data[i+3]<50?255:data[i]*0.299+data[i+1]*0.587+data[i+2]*0.114;
                binary[p]=lum[p]<T?1:0;
            }
            const skeleton=this.#skeletonize(binary,w,h);
            const paths=this.#connectNearbyEndpoints(this.#traceSkeleton(skeleton,w,h),this.#CONNECT_DIST).map(p=>this.#smoothPath(p,this.#SMOOTH_WINDOW)).filter(p=>p.length>=this.#drawState.minPathLen);
            const [ox,oy]=[(this.#CW-w)/2,(this.#CH-h)/2];
            this.#drawState.commands=[{type:'thickness',val:this.#drawState.thickness},{type:'color',val:'x000000'},
                ...paths.flatMap(path=>{
                    const simplified=this.#simplifyPath(path,this.#RDP_EPSILON);
                    return Array.from(
                        {length:Math.ceil((simplified.length-1)/(this.#MAX_CHUNK-1))},
                        (_,i)=>{const start=i*(this.#MAX_CHUNK-1);return{type:'draw',val:simplified.slice(start,start+this.#MAX_CHUNK).map(p=>({x:p.x+ox,y:p.y+oy}))}}
                    );
                })
            ];
        }

        #skeletonize(binary,w,h){
            let [image,next,changed]=[new Uint8Array(binary),new Uint8Array(w*h),!0];
            const step=(arr,out,type)=>{
                let any=!1;
                for (let y=1;y<h-1;y++){
                    for (let x=1;x<w-1;x++){
                        const idx=y*w+x;
                        arr[idx]!==1?(out[idx]=0):((p2,p3,p4,p5,p6,p7,p8,p9)=>{
                            const A=(p2===0&&p3===1)+(p3===0&&p4===1)+(p4===0&&p5===1)+(p5===0&&p6===1)+(p6===0&&p7===1)+(p7===0&&p8===1)+(p8===0&&p9===1)+(p9===0&&p2===1);
                            const B=p2+p3+p4+p5+p6+p7+p8+p9;
                            const [m1,m2]=type===0?[p2*p4*p6,p4*p6*p8]:[p2*p4*p8,p2*p6*p8];
                            (A===1&&B>=2&&B<=6&&m1===0&&m2===0)?(out[idx]=0,any=!0):(out[idx]=1);
                        })(arr[(y-1)*w+x],arr[(y-1)*w+x+1],arr[y*w+x+1],arr[(y+1)*w+x+1],arr[(y+1)*w+x],arr[(y+1)*w+x-1],arr[y*w+x-1],arr[(y-1)*w+x-1]);
                    }
                }
                return any;
            };
            for (let iter=0;iter<this.#THINNING_ITERATIONS&&changed;iter++){
                changed=step(image,next,0);[image,next]=[next,image];
                changed=step(image,next,1)||changed;[image,next]=[next,image];
            }
            return image;
        }

        #traceSkeleton(skel,w,h){
            const visited=new Uint8Array(w*h),paths=[];
            const dirs=[[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1]];
            const get=(x,y)=>x>=0&&x<w&&y>=0&&y<h?skel[y*w+x]:0;
            const traceFrom=(sx,sy)=>{
                if(visited[sy*w+sx]||skel[sy*w+sx]!==1) return null;
                const path=[];let[x,y]=[sx,sy];const stack=[];
                do{visited[y*w+x]=1;path.push({x,y});
                const nbrs=dirs.reduce((acc,[dx,dy])=>{
                const[nx,ny]=[x+dx,y+dy];get(nx,ny)===1&&!visited[ny*w+nx]&&acc.push([nx,ny]);return acc},[]);
                    if(!nbrs.length) break;
                    const [[f,...r]]=[nbrs];
                    r.forEach(n=>stack.push({x:n[0],y:n[1]}));
                    [x,y]=f;
                }while(!0);
                while(stack.length){
                    const{x:bx,y:by}=stack.pop();
                    if(visited[by*w+bx]) continue;
                    const sub=[{x:bx,y:by}];visited[by*w+bx]=1;
                    let [cx,cy]=[bx,by];
                    do{const nbrs=dirs.reduce((acc,[dx,dy])=>{
                            const [nx,ny]=[cx+dx,cy+dy];
                            get(nx,ny)===1&&!visited[ny*w+nx]&&acc.push([nx,ny]);
                            return acc;
                        },[]);
                        if (!nbrs.length) break;
                        const [[f,...r]]=[nbrs];
                        r.forEach(n=>stack.push({x:n[0],y:n[1]}));
                        [cx,cy]=f;visited[cy*w+cx]=1;sub.push({x:cx,y:cy});
                    }while(!0);
                    sub.length>=this.#drawState.minPathLen&&paths.push(sub);
                }
                return path;
            };
            for (let y=0;y<h;y++) for(let x=0;x<w;x++)
                skel[y*w+x]===1&&!visited[y*w+x]&&((p=traceFrom(x,y))=>p?.length>=this.#drawState.minPathLen&&paths.push(p))();
            return paths;
        }

        #connectNearbyEndpoints(paths,maxDist) {
            const result=[],used=new Set();
            paths.forEach((_,i)=>{used.has(i)||((cur=[...paths[i]])=>{used.add(i);let changed=!0;
                    while(changed){changed=!1;const hd=cur[0],tl=cur[cur.length-1];
                        paths.some((o,j)=>!used.has(j)&&((oh=o[0],ot=o[o.length-1])=>{
                                Math.hypot(hd.x-ot.x,hd.y-ot.y)<maxDist&&(cur=[...o.slice(0,-1),...cur],used.add(j),changed=!0,!0)||
                                Math.hypot(tl.x-oh.x,tl.y-oh.y)<maxDist&&(cur=[...cur,...o.slice(1)],used.add(j),changed =!0,!0)||
                                Math.hypot(hd.x-oh.x,hd.y-oh.y)<maxDist&&(cur=[...o.reverse(),...cur.slice(1)],used.add(j),changed=!0,!0)||
                                Math.hypot(tl.x-ot.x,tl.y-ot.y)<maxDist&&(cur=[...cur.slice(0,-1),...o.reverse()],used.add(j),changed=!0,!0);
                        })());
                    }
                    cur.length>=this.#drawState.minPathLen&&result.push(cur);
                })();
            });
            return result;
        }

        #smoothPath(pts,win){
            return pts.length<3||win<1?pts:pts.map((_,i)=>{
                const start=Math.max(0,i-win),end=Math.min(pts.length-1,i+win);
                let sx=0,sy=0,c=0;
                for(let j=start;j<=end;j++){sx+=pts[j].x;sy+=pts[j].y;c++}
                return {x:sx/c,y:sy/c};
            });
        }

        #simplifyPath(pts,eps){
            return (function simplify(seg){
                return seg.length<3?[seg[0],seg[seg.length-1]]:((f,l)=>{
                    const dx=l.x-f.x,dy=l.y-f.y,lenSq=dx*dx+dy*dy;
                    const{maxD,maxI}=seg.slice(1,-1).reduce((acc,p,i)=>{
                        const t=Math.max(0,Math.min(1,((p.x-f.x)*dx +(p.y-f.y)*dy)/(lenSq||1/0)));
                        const d=Math.hypot(p.x-(f.x+t*dx),p.y-(f.y+t*dy));
                        return d>acc.maxD?{maxD:d,maxI:i+1}:acc;
                    },{maxD:0,maxI:0});
                    return maxD>eps?[...simplify(seg.slice(0,maxI+1)),...simplify(seg.slice(maxI)).slice(1)]:[f,l];
                })(seg[0],seg[seg.length-1]);
            })(pts);
        }

        #sendNext() {
            const canRun=this.#drawState.running&&!this.#drawState.paused;
            canRun&&this.#drawState.seq<this.#drawState.commands.length&&
                (({type,val})=>{
                const{speed,socket}=this.#drawState,ws=socket.io.engine.transport.ws,ID=this.#game._codigo;
                type==='color'&&(
                    ws.send(`42[10,${ID},[5,"${val}"]]`),
                    this.#game._player._desenho.mudaCor(val,false),
                    this.#drawState.seq++,
                    this.#drawState.timer=setTimeout(()=>this.#sendNext(),30)
                );
                type==='thickness'&&(
                    ws.send(`42[10,${ID},[6,"${val}"]]`),
                    this.#game._player._desenho.mudaBorda(val,false),
                    this.#drawState.seq++,
                    this.#drawState.timer=setTimeout(()=>this.#sendNext(),20)
                );
                type==='draw'&&(coords=>{
                    for (const p of val) coords.push(Math.round(p.x),Math.round(p.y));
                    ws.send(`42[10,${ID},[${coords.toString()}]]`);
                    this.#game._player.registrar(coords[0]+"@"+coords.slice(1).join("#"));
                    this.#drawState.seq++;
                    this.#drawState.seq%this.#PING_EVERY===0&&ws.send('2');
                    this.#drawState.timer=setTimeout(()=>this.#sendNext(),speed*(0.85+Math.random()*0.3));
                })([2]);
            })(this.#drawState.commands[this.#drawState.seq]);
            canRun&&this.#drawState.seq>=this.#drawState.commands.length&&this.#resetDrawing();
        }

        #drawText(text) {
            text||(()=>{})();
            const font='60px Arial',lines=text.split('\n'),lineHeight=72,canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
            ctx.font=font;
            [canvas.width,canvas.height]=[Math.max(...lines.map(l=>ctx.measureText(l).width))+20,lines.length*lineHeight];
            ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle='#000000';ctx.font=font;ctx.textBaseline='top';
            lines.forEach((l,i)=>ctx.fillText(l,5,i*lineHeight));
            this.#processImage(canvas,!0);
        }
    }
    KawaiiHelper.init();
})();

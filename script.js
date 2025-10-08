document.addEventListener("DOMContentLoaded", () => {
  class QuestIO {
    constructor() {
      // 翻訳辞書にキーを追加
      this.translations = {
        en: {
          settings: "Settings",
          newChat: "New Chat",
          uiStyle: "UI Style",
          themePresets: "Theme Presets",
          dark: "Dark",
          light: "Light",
          customTheme: "Custom Theme",
          baseColor: "Base Color",
          textColor: "Text Color",
          accentGradient: "Accent / Gradient",
          gradientBg: "Gradient BG",
          fontPreset: "Font Preset",
          googleFontsUrl: "Google Fonts URL",
          apply: "Apply",
          enterQuestion: "Enter your question...",
          general: "General",
          language: "Language",
          streamingResponse: "Streaming Response",
          copied: "Copied!",
          copy: "Copy",
          aiError: "Sorry, an error occurred: ",
          convError: "Error: Could not find conversation history.",
          invalidFontUrl:
            "Could not apply font. Please use a valid Google Fonts URL.",
          regenerate: "Regenerate",
          edit: "Edit",
          delete: "Delete",
          copyMessage: "Copy message",
          confirmDelete:
            "Are you sure you want to delete this message? If you delete a user message, the following AI response will also be deleted.",
          save: "Save",
          cancel: "Cancel",
          voiceInput: "Voice input",
          voiceInputActive: "Listening...",
          voiceInputUnsupported:
            "Voice input is not supported by your browser.",
          uploadFile: "Upload file",
          apiKey: "API Key",
          apiKeyPlaceholder: "Enter your API key...",
          apiKeyDesc: "Your key is stored only in your browser.",
          apiKeyMissing: "API Key is not set. Please set it in the settings.",
          fileReadError: "Could not read the file content.",
          fileTooLarge: "File is too large to process (max 2MB).",
        },
        ja: {
          settings: "設定",
          newChat: "新規チャット",
          uiStyle: "UIスタイル",
          themePresets: "テーマプリセット",
          dark: "ダーク",
          light: "ライト",
          customTheme: "カスタムテーマ",
          baseColor: "ベースカラー",
          textColor: "テキストカラー",
          accentGradient: "アクセント / グラデーション",
          gradientBg: "背景グラデーション",
          fontPreset: "フォントプリセット",
          googleFontsUrl: "Google Fonts URL",
          apply: "適用",
          enterQuestion: "質問を入力してください…",
          general: "全般",
          language: "言語",
          streamingResponse: "ストリーミング応答",
          copied: "コピーしました！",
          copy: "コピー",
          aiError: "申し訳ありません、エラーが発生しました: ",
          convError: "エラー: 会話履歴が見つかりませんでした。",
          invalidFontUrl:
            "フォントを適用できませんでした。有効なGoogle FontsのURLを使用してください。",
          regenerate: "再生成",
          edit: "編集",
          delete: "削除",
          copyMessage: "メッセージをコピー",
          confirmDelete:
            "このメッセージを削除してもよろしいですか？ユーザーのメッセージを削除すると、続くAIの返信も一緒に削除されます。",
          save: "保存",
          cancel: "キャンセル",
          voiceInput: "音声入力",
          voiceInputActive: "聞き取り中…",
          voiceInputUnsupported:
            "お使いのブラウザは音声入力に対応していません。",
          uploadFile: "ファイルをアップロード",
          apiKey: "APIキー",
          apiKeyPlaceholder: "APIキーを入力してください…",
          apiKeyDesc: "キーはブラウザ内にのみ保存されます。",
          apiKeyMissing:
            "APIキーが設定されていません。設定画面から入力してください。",
          fileReadError: "ファイルの内容を読み取れませんでした。",
          fileTooLarge: "ファイルが大きすぎます (最大2MB)。",
        },
      };

      this.cacheDOMElements();
      this.state = {
        isSidebarActive: true,
        conversations: {},
        currentConversationId: null,
        language: "ja", // デフォルトを日本語に変更
        isEditing: false,
        apiKey: "",
        isRecognizingSpeech: false,
      };

      this.themePresets = {
        dark: { base: "#111111", text: "#e2e2e2", accent: "#00ffff" },
        light: { base: "#f0f0f0", text: "#222222", accent: "#1a73e8" },
      };
      this.init();
    }

    cacheDOMElements() {
      this.appContainer = document.getElementById("appContainer");
      this.sidebar = document.getElementById("sidebar");
      this.titleContainer = document.getElementById("titleContainer");
      this.chatContainer = document.getElementById("chatContainer");
      this.questionsContainer = document.getElementById("questionsContainer");
      this.hamburgerMenu = document.getElementById("hamburgerMenu");
      this.newChatButton = document.getElementById("newChatButton");
      this.inputBox = document.getElementById("inputBox");
      this.sendButton = document.getElementById("sendButton");
      this.settingsButton = document.getElementById("settingsButton");
      this.settingsModalBackdrop = document.getElementById(
        "settingsModalBackdrop"
      );
      this.settingsModalClose = document.getElementById("settingsModalClose");
      this.styleOptions = document.getElementById("styleOptions");
      this.darkThemeBtn = document.getElementById("darkThemeBtn");
      this.lightThemeBtn = document.getElementById("lightThemeBtn");
      this.baseColorPicker = document.getElementById("baseColorPicker");
      this.textColorPicker = document.getElementById("textColorPicker");
      this.accentColorPicker = document.getElementById("accentColorPicker");
      this.gradientToggle = document.getElementById("gradientToggle");
      this.fontSelector = document.getElementById("fontSelector");
      this.customFontUrl = document.getElementById("customFontUrl");
      this.applyFontBtn = document.getElementById("applyFontBtn");
      this.languageSelector = document.getElementById("languageSelector");
      this.streamingToggle = document.getElementById("streamingToggle");
      this.fileUploadButton = document.getElementById("fileUploadButton");
      this.fileUploadInput = document.getElementById("fileUploadInput");
      this.voiceInputButton = document.getElementById("voiceInputButton");
      this.apiKeyInput = document.getElementById("apiKeyInput");
    }

    init() {
      this.initSpeechRecognition();
      this.addEventListeners();
      this.loadStateFromStorage();
      this.updateSidebarView();
      this.setLanguage(this.state.language, true);
    }

    addEventListeners() {
      document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
      this.hamburgerMenu.addEventListener("click", () => this.toggleSidebar());
      this.newChatButton.addEventListener("click", () => {
        this.getAIResponse = () => {};
        this.startNewConversation();
      });
      this.inputBox.addEventListener("keydown", (e) => this.handleKeyDown(e));
      this.inputBox.addEventListener("input", () => this.autoResizeInput());
      this.sendButton.addEventListener("click", () => this.sendMessage());
      this.chatContainer.addEventListener("click", (e) =>
        this.handleChatAreaClick(e)
      );
      this.initSettingsModal();
      this.initStyleSwitcher();
      this.initThemePresets();
      this.initCustomThemeControls();
      this.languageSelector.addEventListener("change", (e) =>
        this.setLanguage(e.target.value)
      );
      this.streamingToggle.addEventListener("change", () =>
        this.saveStateToStorage()
      );
      this.fileUploadButton.addEventListener("click", () =>
        this.fileUploadInput.click()
      );
      this.fileUploadInput.addEventListener("change", (e) =>
        this.handleFileUpload(e)
      );
      this.voiceInputButton.addEventListener("click", () =>
        this.handleVoiceInput()
      );
      this.apiKeyInput.addEventListener("input", (e) => {
        this.state.apiKey = e.target.value;
        this.saveStateToStorage();
      });
    }

    initSpeechRecognition() {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.lang =
          this.state.language === "ja" ? "ja-JP" : "en-US";
        this.recognition.interimResults = false;
        this.recognition.onstart = () => {
          this.state.isRecognizingSpeech = true;
          this.voiceInputButton.classList.add("active");
          this.voiceInputButton.title =
            this.translations[this.state.language].voiceInputActive;
        };
        this.recognition.onend = () => {
          this.state.isRecognizingSpeech = false;
          this.voiceInputButton.classList.remove("active");
          this.voiceInputButton.title =
            this.translations[this.state.language].voiceInput;
        };
        this.recognition.onresult = (event) => {
          const transcript =
            event.results[event.results.length - 1][0].transcript.trim();
          if (transcript) {
            this.inputBox.value +=
              (this.inputBox.value.length > 0 ? " " : "") + transcript;
            this.autoResizeInput();
            this.inputBox.focus();
          }
        };
        this.recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error);
        };
      } else {
        this.recognition = null;
        console.warn("Speech Recognition not supported in this browser.");
      }
    }

    handleChatAreaClick(e) {
      const target = e.target;
      const codeCopyButton = target.closest(".copy-button");
      if (codeCopyButton) {
        this.handleCopyCode(codeCopyButton);
        return;
      }
      const actionButton = target.closest(".message-action-btn");
      if (actionButton && actionButton.dataset.action) {
        const messageWrapper = actionButton.closest(".message-wrapper");
        const messageId = messageWrapper.dataset.messageId;
        this.handleMessageAction(actionButton, messageId);
        return;
      }
      const editSaveButton = target.closest(".edit-save-btn");
      if (editSaveButton) {
        this.handleSaveEdit(
          editSaveButton.closest(".message-wrapper").dataset.messageId
        );
      }
      const editCancelButton = target.closest(".edit-cancel-btn");
      if (editCancelButton) {
        this.handleCancelEdit(
          editCancelButton.closest(".message-wrapper").dataset.messageId
        );
      }
    }

    setLanguage(lang, isInit = false) {
      this.state.language = lang;
      this.languageSelector.value = lang;
      if (this.recognition) {
        this.recognition.lang = lang === "ja" ? "ja-JP" : "en-US";
      }
      this.applyTranslations();
      if (!isInit) this.saveStateToStorage();
    }
    applyTranslations() {
      const t = this.translations[this.state.language];
      if (!t) return;
      document.documentElement.lang = this.state.language;
      document.querySelector(".settings-modal-title").textContent = t.settings;
      this.newChatButton.title = t.newChat;
      this.settingsButton.title = t.settings;
      this.inputBox.placeholder = t.enterQuestion;
      this.fileUploadButton.title = t.uploadFile;
      this.voiceInputButton.title = this.state.isRecognizingSpeech
        ? t.voiceInputActive
        : t.voiceInput;
      document.querySelectorAll(
        ".general-settings .settings-modal-title"
      )[0].textContent = t.general;
      document.querySelector('label[for="languageSelector"]').textContent =
        t.language;
      document.querySelector('label[for="streamingToggle"]').textContent =
        t.streamingResponse;
      document.querySelectorAll(
        ".style-settings .settings-modal-title"
      )[0].textContent = t.uiStyle;
      document.querySelectorAll(
        ".theme-preset-settings .settings-modal-title"
      )[0].textContent = t.themePresets;
      this.darkThemeBtn.textContent = t.dark;
      this.lightThemeBtn.textContent = t.light;
      document.querySelectorAll(
        ".custom-theme-settings .settings-modal-title"
      )[0].textContent = t.customTheme;
      document.querySelector('label[for="baseColorPicker"]').textContent =
        t.baseColor;
      document.querySelector('label[for="textColorPicker"]').textContent =
        t.textColor;
      document.querySelector('label[for="accentColorPicker"]').textContent =
        t.accentGradient;
      document.querySelector('label[for="gradientToggle"]').textContent =
        t.gradientBg;
      document.querySelector('label[for="fontSelector"]').textContent =
        t.fontPreset;
      document.querySelector('label[for="customFontUrl"]').textContent =
        t.googleFontsUrl;
      this.applyFontBtn.textContent = t.apply;
      document.querySelector('label[for="apiKeyInput"]').textContent = t.apiKey;
      this.apiKeyInput.placeholder = t.apiKeyPlaceholder;
      document.querySelector(".font-input-group + span").textContent =
        t.apiKeyDesc;
      document.querySelectorAll(".copy-button").forEach((btn) => {
        if (btn.textContent !== t.copied) btn.textContent = t.copy;
      });
    }

    // (変更なしのメソッド群)
    initSettingsModal() {
      const openModal = () =>
        this.settingsModalBackdrop.classList.add("active");
      const closeModal = () =>
        this.settingsModalBackdrop.classList.remove("active");
      this.settingsButton.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal();
      });
      this.settingsModalBackdrop.addEventListener("click", closeModal);
      this.settingsModalClose.addEventListener("click", closeModal);
      document
        .getElementById("settingsModal")
        .addEventListener("click", (e) => e.stopPropagation());
    }
    initStyleSwitcher() {
      this.styleOptions.addEventListener("click", (e) => {
        const target = e.target.closest(".style-option");
        if (target) {
          this.changeStyle(target.dataset.style);
          this.saveStateToStorage();
        }
      });
    }
    initThemePresets() {
      this.darkThemeBtn.addEventListener("click", () =>
        this.applyThemePreset("dark")
      );
      this.lightThemeBtn.addEventListener("click", () =>
        this.applyThemePreset("light")
      );
    }
    applyThemePreset(themeName) {
      const preset = this.themePresets[themeName];
      if (!preset) return;
      this.baseColorPicker.value = preset.base;
      this.textColorPicker.value = preset.text;
      this.accentColorPicker.value = preset.accent;
      this.baseColorPicker.dispatchEvent(new Event("input"));
      this.textColorPicker.dispatchEvent(new Event("input"));
      this.accentColorPicker.dispatchEvent(new Event("input"));
      document.body.classList.toggle("light-bg-base", themeName === "light");
      document.body.classList.toggle("dark-bg-base", themeName === "dark");
    }
    changeStyle(style) {
      document.body.classList.remove(
        "style-modern",
        "style-liquid",
        "style-clay"
      );
      document.body.classList.add(`style-${style}`);
      this.styleOptions.querySelectorAll(".style-option").forEach((opt) => {
        opt.classList.toggle("active", opt.dataset.style === style);
      });
    }
    initCustomThemeControls() {
      const save = () => this.saveStateToStorage();
      this.baseColorPicker.addEventListener("input", (e) => {
        document.documentElement.style.setProperty(
          "--bg-color",
          e.target.value
        );
        const isLight = this.isColorLight(e.target.value);
        document.body.classList.toggle("light-bg-base", isLight);
        document.body.classList.toggle("dark-bg-base", !isLight);
        save();
      });
      this.textColorPicker.addEventListener("input", (e) => {
        document.documentElement.style.setProperty(
          "--text-color",
          e.target.value
        );
        save();
      });
      this.accentColorPicker.addEventListener("input", (e) => {
        const { h } = this.hexToHsl(e.target.value);
        document.documentElement.style.setProperty("--accent-hue-1", h);
        save();
      });
      this.gradientToggle.addEventListener("change", (e) => {
        document.body.classList.toggle("gradient-off", !e.target.checked);
        save();
      });
      this.fontSelector.addEventListener("change", (e) => {
        document.documentElement.style.setProperty(
          "--font-main",
          e.target.value
        );
        this.customFontUrl.value = "";
        const customOpt = document.getElementById("custom-font-option");
        if (customOpt) customOpt.remove();
        save();
      });
      this.applyFontBtn.addEventListener("click", () => {
        const url = this.customFontUrl.value.trim();
        if (url) this.applyCustomFont(url);
      });
    }
    applyCustomFont(url, isFromLoad = false) {
      try {
        let importUrl = "",
          fontName = "";
        if (url.includes("fonts.google.com/specimen/")) {
          const fontNameWithPlus = url.split("/").pop().split("?")[0];
          fontName = fontNameWithPlus.replace(/\+/g, " ");
          importUrl = `https://fonts.googleapis.com/css2?family=${fontNameWithPlus}&display=swap`;
        } else if (url.includes("fonts.googleapis.com/css2?family=")) {
          importUrl = url;
          fontName = new URL(url).searchParams
            .get("family")
            .split(/[:(]/)[0]
            .replace(/\+/g, " ");
        } else {
          throw new Error("URL is not a recognized Google Fonts format.");
        }
        if (!fontName) throw new Error("Could not parse font name from URL.");
        const oldLink = document.getElementById("custom-font-stylesheet");
        if (oldLink) oldLink.remove();
        const link = document.createElement("link");
        link.id = "custom-font-stylesheet";
        link.rel = "stylesheet";
        link.href = importUrl;
        document.head.appendChild(link);
        const newFontFamily = `'${fontName}', sans-serif`;
        document.documentElement.style.setProperty(
          "--font-main",
          newFontFamily
        );
        const customOpt = document.getElementById("custom-font-option");
        if (customOpt) customOpt.remove();
        const newOption = new Option(
          `${fontName} (Custom)`,
          newFontFamily,
          true,
          true
        );
        newOption.id = "custom-font-option";
        this.fontSelector.add(newOption);
        if (!isFromLoad) this.saveStateToStorage();
      } catch (e) {
        console.error("Invalid Google Font URL:", e);
        alert(this.translations[this.state.language].invalidFontUrl);
      }
    }

    saveStateToStorage() {
      const appState = {
        conversations: this.state.conversations,
        currentId: this.state.currentConversationId,
        language: this.languageSelector.value,
        streaming: this.streamingToggle.checked,
        uiStyle: Array.from(document.body.classList).find((c) =>
          c.startsWith("style-")
        ),
        baseColor: this.baseColorPicker.value,
        textColor: this.textColorPicker.value,
        accentColor: this.accentColorPicker.value,
        gradientOn: this.gradientToggle.checked,
        font: this.fontSelector.value,
        customFontUrl: document.getElementById("custom-font-option")
          ? this.customFontUrl.value
          : "",
        apiKey: this.state.apiKey,
      };
      localStorage.setItem("questio_state", JSON.stringify(appState));
    }
    loadStateFromStorage() {
      try {
        const storedState = JSON.parse(localStorage.getItem("questio_state"));
        if (storedState) {
          this.state.apiKey = storedState.apiKey || "";
          this.apiKeyInput.value = this.state.apiKey;
          this.setLanguage(storedState.language || "ja", true);
          this.streamingToggle.checked = storedState.streaming ?? true;
          this.state.conversations = storedState.conversations || {};
          this.changeStyle(
            storedState.uiStyle?.replace("style-", "") || "modern"
          );
          const baseColor = storedState.baseColor || "#111111";
          document.documentElement.style.setProperty("--bg-color", baseColor);
          this.baseColorPicker.value = baseColor;
          const isLight = this.isColorLight(baseColor);
          document.body.classList.toggle("light-bg-base", isLight);
          document.body.classList.toggle("dark-bg-base", !isLight);
          const textColor = storedState.textColor || "#e2e2e2";
          document.documentElement.style.setProperty("--text-color", textColor);
          this.textColorPicker.value = textColor;
          const accentColor = storedState.accentColor || "#00ffff";
          const { h } = this.hexToHsl(accentColor);
          document.documentElement.style.setProperty("--accent-hue-1", h);
          this.accentColorPicker.value = accentColor;
          const gradientOn = storedState.gradientOn ?? true;
          document.body.classList.toggle("gradient-off", !gradientOn);
          this.gradientToggle.checked = gradientOn;
          if (storedState.customFontUrl) {
            this.customFontUrl.value = storedState.customFontUrl;
            this.applyCustomFont(storedState.customFontUrl, true);
          } else {
            const font = storedState.font || "'Inter', sans-serif";
            document.documentElement.style.setProperty("--font-main", font);
            this.fontSelector.value = font;
          }
          this.questionsContainer.innerHTML = "";
          Object.keys(this.state.conversations)
            .sort((a, b) => b.localeCompare(a))
            .forEach((id) => {
              this.addConversationToSidebar(
                id,
                this.state.conversations[id].title
              );
            });
          if (
            storedState.currentId &&
            this.state.conversations[storedState.currentId]
          ) {
            this.loadConversation(storedState.currentId);
          }
        } else {
          this.changeStyle("modern");
          this.applyThemePreset("dark");
          this.setLanguage("ja", true);
        }
      } catch (e) {
        console.error("Failed to load state from localStorage", e);
      }
    }

    renderMessageContent(bubbleElement, content) {
      const t = this.translations[this.state.language];
      bubbleElement.innerHTML = marked.parse(content);
      bubbleElement.querySelectorAll("pre").forEach((pre) => {
        if (pre.querySelector(".copy-button")) return;
        const button = document.createElement("button");
        button.className = "copy-button";
        button.textContent = t.copy;
        pre.appendChild(button);
      });
      bubbleElement.querySelectorAll("pre code:not(.hljs)").forEach((block) => {
        hljs.highlightElement(block);
      });
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    generateMessageId() {
      return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    }
    processUserMessage(message) {
      if (this.state.isEditing) return;
      if (!this.titleContainer.classList.contains("conversation-started")) {
        this.titleContainer.classList.add("conversation-started");
      }
      let isNewConversation = !this.state.currentConversationId;
      if (isNewConversation) {
        const timestamp = Date.now();
        this.state.currentConversationId = `conv_${timestamp}`;
        this.state.conversations[this.state.currentConversationId] = {
          title: message.substring(0, 35) + (message.length > 35 ? "..." : ""),
          messages: [],
        };
      }
      const userMessageId = this.generateMessageId();
      this.logMessage("user", message, userMessageId);
      this.createBubble(message, "user", false, userMessageId);
      this.inputBox.value = "";
      this.autoResizeInput();
      if (isNewConversation) {
        this.addConversationToSidebar(
          this.state.currentConversationId,
          this.state.conversations[this.state.currentConversationId].title
        );
      }
      this.saveStateToStorage();
      const aiMessageId = this.generateMessageId();
      const loadingBubble = this.createBubble("", "ai", true, aiMessageId);
      this.getAIResponse(
        loadingBubble.querySelector(".chat-bubble"),
        aiMessageId
      );
    }
    logMessage(role, content, id) {
      if (!this.state.currentConversationId) return;
      const conversation =
        this.state.conversations[this.state.currentConversationId];
      const existingMsgIndex = conversation.messages.findIndex(
        (m) => m.id === id
      );
      if (existingMsgIndex > -1) {
        conversation.messages[existingMsgIndex].content = content;
      } else {
        conversation.messages.push({ role, content, id });
      }
    }
    loadConversation(id) {
      if (
        !this.state.conversations[id] ||
        this.state.currentConversationId === id
      )
        return;
      this.state.currentConversationId = id;
      this.chatContainer.innerHTML = "";
      this.chatContainer.prepend(this.titleContainer);
      this.state.conversations[id].messages.forEach((msg) =>
        this.createBubble(msg.content, msg.role, false, msg.id)
      );
      if (this.state.conversations[id].messages.length > 0) {
        this.titleContainer.classList.add("conversation-started");
      }
      this.updateSidebarActiveState();
      setTimeout(() => {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      }, 0);
    }
    addConversationToSidebar(id, title) {
      const item = document.createElement("div");
      item.className = "question-item";
      item.textContent = title;
      item.dataset.convId = id;
      item.addEventListener("click", () => this.loadConversation(id));
      this.questionsContainer.prepend(item);
      this.updateSidebarActiveState();
    }
    updateSidebarActiveState() {
      document.querySelectorAll(".question-item").forEach((item) => {
        item.classList.toggle(
          "active",
          item.dataset.convId === this.state.currentConversationId
        );
      });
    }
    hexToHsl(H) {
      let r = 0,
        g = 0,
        b = 0;
      if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
      } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
      }
      r /= 255;
      g /= 255;
      b /= 255;
      let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0;
      if (delta == 0) h = 0;
      else if (cmax == r) h = ((g - b) / delta) % 6;
      else if (cmax == g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
      return { h: h };
    }
    isColorLight(hexColor) {
      const r = parseInt(hexColor.substr(1, 2), 16);
      const g = parseInt(hexColor.substr(3, 2), 16);
      const b = parseInt(hexColor.substr(5, 2), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5;
    }
    toggleSidebar() {
      this.state.isSidebarActive = !this.state.isSidebarActive;
      this.updateSidebarView();
    }
    updateSidebarView() {
      this.appContainer.classList.toggle(
        "sidebar-collapsed",
        !this.state.isSidebarActive
      );
      this.hamburgerMenu.classList.toggle("active", this.state.isSidebarActive);
    }
    startNewConversation() {
      this.state.currentConversationId = null;
      this.chatContainer.innerHTML = "";
      this.chatContainer.prepend(this.titleContainer);
      this.titleContainer.classList.remove("conversation-started");
      this.inputBox.value = "";
      this.autoResizeInput();
      this.inputBox.focus();
      this.updateSidebarActiveState();
    }
    sendMessage() {
      const message = this.inputBox.value.trim();
      if (message) this.processUserMessage(message);
    }
    handleMouseMove(e) {
      document.body.style.setProperty(
        "--mouse-x",
        `${(e.clientX / window.innerWidth) * 100}%`
      );
      document.body.style.setProperty(
        "--mouse-y",
        `${(e.clientY / window.innerHeight) * 100}%`
      );
    }
    handleKeyDown(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    }
    autoResizeInput() {
      this.inputBox.style.height = "auto";
      this.inputBox.style.height = this.inputBox.scrollHeight + "px";
      this.sendButton.disabled = this.inputBox.value.trim().length === 0;
    }
    handleCopyCode(button) {
      const pre = button.parentElement;
      const code = pre.querySelector("code");
      const t = this.translations[this.state.language];
      if (code) {
        navigator.clipboard
          .writeText(code.innerText)
          .then(() => {
            button.textContent = t.copied;
            setTimeout(() => {
              button.textContent = t.copy;
            }, 2000);
          })
          .catch((err) => console.error("Failed to copy: ", err));
      }
    }

    // ★修正: 削除ボタンのSVGを修正
    createBubble(content, role, isLoading = false, messageId) {
      const t = this.translations[this.state.language];
      const wrapper = document.createElement("div");
      wrapper.className = `message-wrapper ${role}-message`;
      wrapper.dataset.messageId = messageId;
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${role}-bubble`;
      if (isLoading) {
        bubble.innerHTML = '<span class="typing-indicator"></span>';
      } else {
        this.renderMessageContent(bubble, content);
      }
      const actions = document.createElement("div");
      actions.className = "message-actions";
      let actionsHtml = "";
      if (role === "ai" && !isLoading) {
        actionsHtml += `<button class="message-action-btn" data-action="regenerate" title="${t.regenerate}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12q0 3.328-2.336 5.664T12 20t-5.664-2.336T4 12t2.336-5.664T12 4q1.734 0 3.258.742T17.89 7M20 7V4h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      }
      if (role === "user" && !isLoading) {
        actionsHtml += `<button class="message-action-btn" data-action="edit" title="${t.edit}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      }
      if (!isLoading) {
        actionsHtml += `<button class="message-action-btn" data-action="copy" title="${t.copyMessage}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4-2a2 2 0 0 1 2-2h-4a2 2 0 0 0-2 2v2h8V4a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
        actionsHtml += `<button class="message-action-btn" data-action="delete" title="${t.delete}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      }
      actions.innerHTML = actionsHtml;
      wrapper.appendChild(bubble);
      wrapper.appendChild(actions);
      this.chatContainer.appendChild(wrapper);
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      return wrapper;
    }

    handleFileUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      const t = this.translations[this.state.language];
      if (file.size > 2 * 1024 * 1024) {
        alert(t.fileTooLarge);
        e.target.value = "";
        return;
      }
      if (file.type.startsWith("text/")) {
        const reader = new FileReader();
        reader.onload = (readEvent) => {
          const content = readEvent.target.result;
          const message = `File uploaded: "${file.name}"\n\n\`\`\`\n${content}\n\`\`\`\nPlease proceed based on the content of this file.`;
          this.processUserMessage(message);
        };
        reader.onerror = () => {
          alert(t.fileReadError);
        };
        reader.readAsText(file);
      } else {
        const message = `File uploaded: "${file.name}". I cannot view the content of this non-text file yet.`;
        this.processUserMessage(message);
      }
      e.target.value = "";
    }
    handleVoiceInput() {
      if (!this.recognition) {
        alert(this.translations[this.state.language].voiceInputUnsupported);
        return;
      }
      if (this.state.isRecognizingSpeech) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    }
    handleMessageAction(button, messageId) {
      if (this.state.isEditing) return;
      const action = button.dataset.action;
      switch (action) {
        case "copy":
          this.handleCopyMessageContent(button, messageId);
          break;
        case "delete":
          this.handleDeleteMessage(messageId);
          break;
        case "regenerate":
          this.handleRegenerate(messageId);
          break;
        case "edit":
          this.handleEditMessage(messageId);
          break;
      }
    }

    // ★修正: コピー成功時にアイコンを変更してフィードバック
    handleCopyMessageContent(button, messageId) {
      const t = this.translations[this.state.language];
      const conversation =
        this.state.conversations[this.state.currentConversationId];
      if (!conversation) return;
      const message = conversation.messages.find((m) => m.id === messageId);
      if (!message) return;
      navigator.clipboard
        .writeText(message.content)
        .then(() => {
          const originalIcon = button.innerHTML;
          const originalTitle = button.title;
          button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
          button.title = t.copied;
          setTimeout(() => {
            button.innerHTML = originalIcon;
            button.title = originalTitle;
          }, 2000);
        })
        .catch((err) => console.error("Failed to copy message content: ", err));
    }

    handleDeleteMessage(messageId) {
      const t = this.translations[this.state.language];
      if (!window.confirm(t.confirmDelete)) return;
      const conv = this.state.conversations[this.state.currentConversationId];
      if (!conv) return;
      const messageIndex = conv.messages.findIndex((m) => m.id === messageId);
      if (messageIndex === -1) return;
      const idsToDelete = [conv.messages[messageIndex].id];
      if (
        conv.messages[messageIndex].role === "user" &&
        conv.messages[messageIndex + 1]?.role === "ai"
      ) {
        idsToDelete.push(conv.messages[messageIndex + 1].id);
      }
      conv.messages = conv.messages.filter((m) => !idsToDelete.includes(m.id));
      idsToDelete.forEach((id) => {
        const el = this.chatContainer.querySelector(
          `.message-wrapper[data-message-id="${id}"]`
        );
        if (el) el.remove();
      });
      this.saveStateToStorage();
    }

    handleRegenerate(messageId) {
      const conv = this.state.conversations[this.state.currentConversationId];
      if (!conv) return;

      // 再生成ボタンが押されたメッセージのインデックス（位置）を探す
      const messageIndex = conv.messages.findIndex((m) => m.id === messageId);
      if (messageIndex === -1) return;

      // -------------------------------------------------------------
      // ご提案いただいた新しいロジック
      // -------------------------------------------------------------

      // １．そのメッセージと、それ以降のメッセージをすべて削除する

      // まず、会話データ（state）から削除
      const messagesToDelete = conv.messages.splice(messageIndex);

      // 次に、画面上（UI）から削除
      messagesToDelete.forEach((msg) => {
        const el = this.chatContainer.querySelector(
          `.message-wrapper[data-message-id="${msg.id}"]`
        );
        if (el) el.remove();
      });

      // ２．（削除が終わった後の）最新のメッセージに対して応答を生成する

      // 新しい「考え中...」の吹き出しを作成
      const newAiMessageId = this.generateMessageId();
      const loadingBubble = this.createBubble("", "ai", true, newAiMessageId);

      // APIにリクエストを送り、新しい応答をもらう
      this.getAIResponse(
        loadingBubble.querySelector(".chat-bubble"),
        newAiMessageId
      );

      // 変更を保存
      this.saveStateToStorage();
    }

    handleEditMessage(messageId) {
      this.state.isEditing = true;
      const wrapper = this.chatContainer.querySelector(
        `.message-wrapper[data-message-id="${messageId}"]`
      );
      if (!wrapper) return;
      const bubble = wrapper.querySelector(".chat-bubble");
      const actions = wrapper.querySelector(".message-actions");
      const conv = this.state.conversations[this.state.currentConversationId];
      const message = conv.messages.find((m) => m.id === messageId);
      if (!message) return;
      const t = this.translations[this.state.language];
      wrapper.dataset.originalContent = message.content;
      bubble.innerHTML = `<textarea class="edit-textarea">${message.content}</textarea>`;
      actions.innerHTML = `<button class="message-action-btn edit-save-btn" title="${t.save}">✓ ${t.save}</button><button class="message-action-btn edit-cancel-btn" title="${t.cancel}">✗ ${t.cancel}</button>`;
      const textarea = bubble.querySelector(".edit-textarea");
      textarea.focus();
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }

    // ★修正: 編集保存時のロジックを全面的に見直し
    handleSaveEdit(messageId) {
      const wrapper = this.chatContainer.querySelector(
        `.message-wrapper[data-message-id="${messageId}"]`
      );
      const textarea = wrapper.querySelector(".edit-textarea");
      const newContent = textarea.value.trim();

      if (newContent && newContent !== wrapper.dataset.originalContent) {
        // state更新
        this.logMessage("user", newContent, messageId);

        // UIを更新
        const bubble = wrapper.querySelector(".chat-bubble");
        this.renderMessageContent(bubble, newContent);
        this.rebuildActionButtons(wrapper, "user");

        // 編集したメッセージ(user)を基点に再生成
        this.handleRegenerate(messageId);
      } else {
        // 内容が同じ、または空の場合はキャンセルと同じ
        this.handleCancelEdit(messageId);
      }

      wrapper.removeAttribute("data-original-content");
      this.state.isEditing = false;
    }

    handleCancelEdit(messageId) {
      const wrapper = this.chatContainer.querySelector(
        `.message-wrapper[data-message-id="${messageId}"]`
      );
      const originalContent = wrapper.dataset.originalContent;
      const bubble = wrapper.querySelector(".chat-bubble");
      this.renderMessageContent(bubble, originalContent);
      this.rebuildActionButtons(wrapper, "user");
      wrapper.removeAttribute("data-original-content");
      this.state.isEditing = false;
    }

    rebuildActionButtons(wrapper, role) {
      const t = this.translations[this.state.language];
      if (wrapper.querySelector(".message-actions"))
        wrapper.querySelector(".message-actions").remove();
      const actions = document.createElement("div");
      actions.className = "message-actions";
      let actionsHtml = "";
      if (role === "ai") {
        actionsHtml += `<button class="message-action-btn" data-action="regenerate" title="${t.regenerate}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12q0 3.328-2.336 5.664T12 20t-5.664-2.336T4 12t2.336-5.664T12 4q1.734 0 3.258.742T17.89 7M20 7V4h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      }
      if (role === "user") {
        actionsHtml += `<button class="message-action-btn" data-action="edit" title="${t.edit}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      }
      actionsHtml += `<button class="message-action-btn" data-action="copy" title="${t.copyMessage}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4-2a2 2 0 0 1 2-2h-4a2 2 0 0 0-2 2v2h8V4a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      actionsHtml += `<button class="message-action-btn" data-action="delete" title="${t.delete}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      actions.innerHTML = actionsHtml;
      wrapper.appendChild(actions);
    }

    async getAIResponse(aiBubbleElement, aiMessageId) {
      const conv = this.state.conversations[this.state.currentConversationId];
      const t = this.translations[this.state.language];
      if (!this.state.apiKey) {
        this.renderMessageContent(aiBubbleElement, t.apiKeyMissing);
        this.logMessage("assistant", t.apiKeyMissing, aiMessageId);
        this.saveStateToStorage();
        return;
      }
      if (!conv || !conv.messages) {
        return;
      }
      const messagesForApi = conv.messages.map(({ role, content }) => ({
        role,
        content,
      }));
      const isStreaming = this.streamingToggle.checked;
      const apiUrl = "https://free.v36.cm/v1/chat/completions";
      let fullResponse = "";
      const loadingWrapper = aiBubbleElement.closest(".message-wrapper");
      try {
        this.logMessage("assistant", "", aiMessageId);
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: messagesForApi,
            stream: isStreaming,
          }),
        });
        if (!response.ok)
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        if (isStreaming && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          const cursorSpan = '<span class="typing-cursor">▌</span>';
          aiBubbleElement.innerHTML = cursorSpan;
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const dataStr = line.substring(6).trim();
                if (dataStr === "[DONE]") continue;
                try {
                  const data = JSON.parse(dataStr);
                  const delta = data.choices[0]?.delta?.content;
                  if (delta) {
                    fullResponse += delta;
                    aiBubbleElement.innerHTML = marked.parse(
                      fullResponse + cursorSpan
                    );
                    this.chatContainer.scrollTop =
                      this.chatContainer.scrollHeight;
                  }
                } catch (e) {}
              }
            }
          }
        } else {
          const data = await response.json();
          if (!data.choices || !data.choices.length)
            throw new Error("Invalid API response");
          fullResponse = data.choices[0].message.content;
        }
        this.logMessage("assistant", fullResponse, aiMessageId);
        this.saveStateToStorage();
        this.renderMessageContent(aiBubbleElement, fullResponse);
        this.rebuildActionButtons(loadingWrapper, "ai");
      } catch (error) {
        console.error("AI API call error:", error);
        fullResponse = t.aiError + error.message;
        this.logMessage("assistant", fullResponse, aiMessageId);
        this.saveStateToStorage();
        if (loadingWrapper) loadingWrapper.remove();
        this.createBubble(fullResponse, "ai", false, aiMessageId);
      }
    }
  }

  new QuestIO();
});

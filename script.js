document.addEventListener("DOMContentLoaded", () => {
  class QuestIO {
    constructor() {
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
          editTitle: "Edit title",
          pin: "Pin conversation",
          unpin: "Unpin conversation",
          deleteConversation: "Delete conversation",
          confirmDeleteConversation:
            "Are you sure you want to delete this conversation and all its messages?",
          createFolder: "Create Folder",
          search: "Search",
          import: "Import",
          exportAll: "Export All",
          exportConversation: "Export conversation",
          confirmImport:
            "This will import conversations and folders from a JSON file. Existing data will be merged. Continue?",
          importSuccess: "Import successful!",
          importError:
            "Import failed. Please check the file format or console for errors.",
          stopGeneration: "Stop generation",
          sendKey: "Send Key",
          enterKey: "Enter",
          shiftEnterKey: "Shift + Enter",
          ctrlEnterKey: "Ctrl + Enter",
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
          editTitle: "タイトルを編集",
          pin: "会話をピン留め",
          unpin: "ピン留めを解除",
          deleteConversation: "会話を削除",
          confirmDeleteConversation:
            "この会話と全てのメッセージを削除してもよろしいですか？",
          createFolder: "フォルダを作成",
          search: "検索",
          import: "インポート",
          exportAll: "すべてエクスポート",
          exportConversation: "この会話をエクスポート",
          confirmImport:
            "JSONファイルから会話とフォルダをインポートします。既存のデータはマージされます。続行しますか？",
          importSuccess: "インポートに成功しました！",
          importError:
            "インポートに失敗しました。ファイル形式を確認するか、コンソールでエラーを確認してください。",
          stopGeneration: "生成を停止",
          sendKey: "送信キー",
          enterKey: "Enter",
          shiftEnterKey: "Shift + Enter",
          ctrlEnterKey: "Ctrl + Enter",
        },
      };

      this.cacheDOMElements();
      this.state = {
        isLeftSidebarActive: true,
        isRightSidebarActive: true,
        conversations: {},
        folders: {},
        uncategorizedOrder: [],
        currentConversationId: null,
        language: "ja",
        isEditing: false,
        apiKey: "",
        isRecognizingSpeech: false,
        attachedFiles: [],
        isGenerating: false,
        abortController: null,
        sendKey: "enter",
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
      this.stopButton = document.getElementById("stopButton");
      this.sendKeySelector = document.getElementById("sendKeySelector");
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
      this.inputArea = document.querySelector(".input-area");
      this.attachedFileDisplay = document.getElementById("attachedFileDisplay");
      this.searchButton = document.getElementById("searchButton");
      this.searchView = document.getElementById("searchView");
      this.searchInput = document.getElementById("searchInput");
      this.searchCloseButton = document.getElementById("searchCloseButton");
      this.createFolderButton = document.getElementById("createFolderButton");
      this.searchResultsContainer = document.getElementById(
        "searchResultsContainer"
      );
      this.importConversationsButton = document.getElementById(
        "importConversationsButton"
      );
      this.exportAllConversationsButton = document.getElementById(
        "exportAllConversationsButton"
      );

      this.rightSidebar = document.getElementById("rightSidebar");
      this.convSettingsMenuButton = document.getElementById(
        "convSettingsMenuButton"
      );
      this.rightSidebarClose = document.getElementById("rightSidebarClose");
      this.systemPromptTextarea = document.getElementById(
        "systemPromptTextarea"
      );
      this.aiModelSelector = document.getElementById("aiModelSelector");
      this.temperatureSlider = document.getElementById("temperatureSlider");
      this.temperatureValue = document.getElementById("temperatureValue");
      this.maxTokensSlider = document.getElementById("maxTokensSlider");
      this.maxTokensValue = document.getElementById("maxTokensValue");
      this.topPSlider = document.getElementById("topPSlider");
      this.topPValue = document.getElementById("topPValue");
    }

    init() {
      this.initSpeechRecognition();
      this.addEventListeners();
      this.loadStateFromStorage();
      this.renderConversationList();
      this.setLanguage(this.state.language, true);
      this.toggleRightSidebar(this.state.isRightSidebarActive);
      this.initResizers();
    }

    addEventListeners() {
      document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
      this.newChatButton.addEventListener("click", () => {
        this.startNewConversation();
      });
      this.inputBox.addEventListener("keydown", (e) => this.handleKeyDown(e));
      this.inputBox.addEventListener("input", () => this.autoResizeInput());
      this.sendButton.addEventListener("click", () => this.sendMessage());
      this.stopButton.addEventListener("click", () => this.stopGeneration());
      this.sendKeySelector.addEventListener("change", (e) => {
        this.state.sendKey = e.target.value;
        this.saveStateToStorage();
      });
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
      this.attachedFileDisplay.addEventListener("click", (e) => {
        const removeButton = e.target.closest(".remove-file-button");
        if (removeButton) {
          const fileIdToRemove = removeButton.dataset.fileId;
          this.state.attachedFiles = this.state.attachedFiles.filter(
            (file) => file.id !== fileIdToRemove
          );
          this.updateAttachedFileUI();
        }
      });
      this.apiKeyInput.addEventListener("input", (e) => {
        this.state.apiKey = e.target.value;
        this.saveStateToStorage();
      });
      this.searchButton.addEventListener("click", () =>
        this.toggleSearchView()
      );
      this.searchCloseButton.addEventListener("click", () =>
        this.toggleSearchView(false)
      );
      this.searchInput.addEventListener("input", () => this.performSearch());

      this.questionsContainer.addEventListener("click", (e) => {
        const moreOptionsButton = e.target.closest(".more-options-btn");
        if (moreOptionsButton) {
          e.stopPropagation();
          this.toggleActionMenu(
            moreOptionsButton.closest(".conversation-actions")
          );
          return;
        }

        const dropdownItem = e.target.closest(".dropdown-item");
        if (dropdownItem) {
          const action = dropdownItem.dataset.action;
          dropdownItem
            .closest(".conversation-actions")
            .classList.remove("menu-open");

          if (action.includes("folder")) {
            const folderId =
              e.target.closest(".folder-container").dataset.folderId;
            if (action === "edit-folder-name")
              this.startFolderNameEdit(folderId);
            if (action === "delete-folder") this.deleteFolder(folderId);
          } else {
            const convId = e.target.closest(".question-item").dataset.convId;
            if (action === "delete") this.deleteConversation(convId);
            if (action === "pin") this.togglePinConversation(convId);
            if (action === "edit-title") this.startTitleEdit(convId);
            if (action === "export") this.exportConversation(convId);
          }
          return;
        }

        const folderHeader = e.target.closest(".folder-header");
        if (folderHeader) {
          this.toggleFolder(folderHeader.parentElement.dataset.folderId);
          return;
        }

        const conversationItem = e.target.closest(".question-item");
        if (conversationItem && conversationItem.dataset.convId) {
          this.loadConversation(conversationItem.dataset.convId);
        }
      });

      this.createFolderButton.addEventListener("click", () =>
        this.createFolder()
      );

      this.questionsContainer.addEventListener("dragstart", (e) =>
        this.handleDragStart(e)
      );
      this.questionsContainer.addEventListener("dragover", (e) =>
        this.handleDragOver(e)
      );
      this.questionsContainer.addEventListener("dragleave", (e) =>
        this.handleDragLeave(e)
      );
      this.questionsContainer.addEventListener("drop", (e) =>
        this.handleDrop(e)
      );
      this.questionsContainer.addEventListener("dragend", (e) =>
        this.handleDragEnd(e)
      );
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".conversation-actions")) {
          document
            .querySelectorAll(".conversation-actions.menu-open")
            .forEach((menu) => {
              menu.classList.remove("menu-open");
            });
        }
      });
      this.importConversationsButton.addEventListener("click", () =>
        this.importConversations()
      );
      this.exportAllConversationsButton.addEventListener("click", () =>
        this.exportAllConversations()
      );


      this.rightSidebarClose.addEventListener("click", () =>
        this.toggleRightSidebar(false)
      );

      const throttledSave = this.throttle(
        () => this.saveCurrentConversationSettings(),
        500
      );

      this.systemPromptTextarea.addEventListener("input", throttledSave);
      this.aiModelSelector.addEventListener("change", throttledSave);

      this.temperatureSlider.addEventListener("input", () => {
        this.temperatureValue.textContent = parseFloat(
          this.temperatureSlider.value
        ).toFixed(2);
      });
      this.temperatureSlider.addEventListener("change", throttledSave);

      this.maxTokensSlider.addEventListener("input", () => {
        this.maxTokensValue.textContent = this.maxTokensSlider.value;
      });
      this.maxTokensSlider.addEventListener("change", throttledSave);

      this.topPSlider.addEventListener("input", () => {
        this.topPValue.textContent = parseFloat(this.topPSlider.value).toFixed(
          2
        );
      });
      this.topPSlider.addEventListener("change", throttledSave);
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
      this.settingsButton.querySelector("span").textContent = t.settings;

      this.newChatButton.title = t.newChat;
      this.inputBox.placeholder = t.enterQuestion;
      this.fileUploadButton.title = t.uploadFile;
      this.voiceInputButton.title = this.state.isRecognizingSpeech
        ? t.voiceInputActive
        : t.voiceInput;

      this.createFolderButton.querySelector("span").textContent =
        t.createFolder;
      this.searchButton.querySelector("span").textContent = t.search;
      this.importConversationsButton.querySelector("span").textContent =
        t.import;
      this.exportAllConversationsButton.querySelector("span").textContent =
        t.exportAll;

      document.querySelectorAll(
        ".general-settings .settings-modal-title"
      )[0].textContent = t.general;
      document.querySelector('label[for="languageSelector"]').textContent =
        t.language;
      document.querySelector('label[for="streamingToggle"]').textContent =
      document.querySelector('label[for="sendKeySelector"]').textContent =
        t.sendKey;
      this.stopButton.title = t.stopGeneration;
      // 送信キーの選択肢の翻訳
      const sendKeyOptions = this.sendKeySelector.querySelectorAll("option");
      if (sendKeyOptions.length >= 3) {
        sendKeyOptions[0].textContent = t.enterKey;
        sendKeyOptions[1].textContent = t.shiftEnterKey;
        sendKeyOptions[2].textContent = t.ctrlEnterKey;
      }
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
      document.querySelector(".font-input-group span").textContent =
        t.apiKeyDesc;

      document.querySelectorAll(".copy-button").forEach((btn) => {
        if (btn.textContent !== t.copied) btn.textContent = t.copy;
      });
      this.renderConversationList();
    }

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
        uncategorizedOrder: this.state.uncategorizedOrder,
        currentId: this.state.currentConversationId,
        language: this.languageSelector.value,
        streaming: this.streamingToggle.checked,
        sendKey: this.state.sendKey,
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
        folders: this.state.folders,
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
          this.state.folders = storedState.folders || {};
          this.setLanguage(storedState.language || "ja", true);
          this.streamingToggle.checked = storedState.streaming ?? true;
          this.state.sendKey = storedState.sendKey || "enter";
          this.sendKeySelector.value = this.state.sendKey;
          this.state.conversations = storedState.conversations || {};
          if (storedState.uncategorizedOrder) {
            this.state.uncategorizedOrder = storedState.uncategorizedOrder;
          } else {
            const allConvIds = Object.keys(this.state.conversations);
            const folderConvIds = new Set(
              Object.values(this.state.folders).flatMap((f) => f.convIds)
            );
            this.state.uncategorizedOrder = allConvIds.filter(
              (id) => !folderConvIds.has(id)
            );
            this.sortUncategorized();
          }
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
          const savedLeftWidth = localStorage.getItem("sidebarLeftWidth");
          if (savedLeftWidth) {
            document.documentElement.style.setProperty(
              "--sidebar-left-width",
              savedLeftWidth
            );
          }
          const savedRightWidth = localStorage.getItem("sidebarRightWidth");
          if (savedRightWidth) {
            document.documentElement.style.setProperty(
              "--sidebar-right-width",
              savedRightWidth
            );
          }
          this.renderConversationList();
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
      this.toggleSearchView(false);
      this.state.currentConversationId = id;
      this.chatContainer.innerHTML = "";
      this.chatContainer.prepend(this.titleContainer);

      this.state.conversations[id].messages.forEach((msg) => {
        const displayRole = msg.role === "assistant" ? "ai" : "user";
        const messageId = msg.id || this.generateMessageId();

        const wrapper = document.createElement("div");
        wrapper.className = `message-wrapper ${displayRole}-message`;
        wrapper.dataset.messageId = messageId;
        wrapper.innerHTML = msg.content;

        this.chatContainer.appendChild(wrapper);

        const attachedWrapper = this.chatContainer.querySelector(
          `[data-message-id="${messageId}"]`
        );
        if (attachedWrapper) {
          this.rebuildActionButtons(attachedWrapper, displayRole);
        }
      });

      if (this.state.conversations[id].messages.length > 0) {
        this.titleContainer.classList.add("conversation-started");
      }
      this.renderConversationList();
      setTimeout(() => {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      }, 0);
      this.updateRightSidebarUI(id);
    }

    renderConversationList() {
      const t = this.translations[this.state.language];
      this.questionsContainer.innerHTML = "";
      const fragment = document.createDocumentFragment();

      const conversations = { ...this.state.conversations };
      const folderConversations = new Set();

      Object.entries(this.state.folders).forEach(([folderId, folder]) => {
        const folderContainer = document.createElement("div");
        folderContainer.className = `folder-container ${
          folder.isCollapsed ? "collapsed" : ""
        }`;
        folderContainer.dataset.folderId = folderId;

        folderContainer.innerHTML = `
            <div class="folder-header">
                <div class="folder-info-wrapper">
                    <span class="folder-toggle-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                    <span class="folder-name">${this.escapeHtml(folder.name)}</span>
                </div>
                <div class="conversation-actions">
                    <button class="conv-action-btn more-options-btn" title="More options">
                        <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/></svg>
                    </button>
                    <div class="actions-dropdown">
                        <button class="dropdown-item" data-action="edit-folder-name">
                            <svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                            <span>フォルダ名を編集</span>
                        </button>
                        <button class="dropdown-item delete-action" data-action="delete-folder">
                             <svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            <span>フォルダを削除</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="folder-content"></div>
        `;

        const folderContent = folderContainer.querySelector(".folder-content");

        folder.convIds.forEach((convId) => {
          const conversation = conversations[convId];
          if (!conversation) return;

          folderConversations.add(convId);

          const item = this.createConversationItem(convId, conversation, t);
          folderContent.appendChild(item);
        });

        fragment.appendChild(folderContainer);
      });

      const uncategorizedContainer = document.createElement("div");

      this.state.uncategorizedOrder.forEach((id) => {
        if (conversations[id] && !folderConversations.has(id)) {
          const conversation = conversations[id];
          const item = this.createConversationItem(id, conversation, t);
          uncategorizedContainer.appendChild(item);
        }
      });

      if (uncategorizedContainer.children.length > 0) {
        if (fragment.children.length > 0) {
          const separator = document.createElement("hr");
          separator.className = "folder-separator";
          fragment.appendChild(separator);
        }
        fragment.appendChild(uncategorizedContainer);
      }

      this.questionsContainer.appendChild(fragment);
    }

    createConversationItem(id, conversation, t) {
      const item = document.createElement("div");
      item.className = "question-item";
      item.classList.toggle("active", id === this.state.currentConversationId);
      item.classList.toggle("pinned", !!conversation.isPinned);
      item.dataset.convId = id;
      item.draggable = true;

      const cleanTitle = (conversation.title || "")
        .replace(/<[^>]*>?/gm, "")
        .substring(0, 35);
      const titleHtml =
        this.escapeHtml(cleanTitle) +
        (conversation.title.length > 35 ? "..." : "");
      const pinButtonTitle = conversation.isPinned ? t.unpin : t.pin;

      item.innerHTML = `
        <span class="conversation-title">${titleHtml}</span>
        <div class="conversation-actions">
          <button class="conv-action-btn more-options-btn" title="More options">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/></svg>
          </button>
          <div class="actions-dropdown">
              <button class="dropdown-item" data-action="edit-title" title="${t.editTitle}">
                <svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span>${t.editTitle}</span>
              </button>
              <button class="dropdown-item ${
                !!conversation.isPinned ? "pinned" : ""
              }" data-action="pin" title="${pinButtonTitle}">
                 <svg viewBox="0 0 24 24"><path d="M16 3l-5 5-1 4 4-1 5-5-3-3zM8 13l-4 4 1 4 4-1 4-4"/></svg>
                 <span>${pinButtonTitle}</span>
              </button>
              <!-- エクスポートボタンを追加 -->
              <button class="dropdown-item" data-action="export" title="${t.exportConversation}">
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                <span>${t.exportConversation}</span>
              </button>
              <button class="dropdown-item delete-action" data-action="delete" title="${
                t.deleteConversation
              }">
                <svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                <span>${t.deleteConversation}</span>
              </button>
          </div>
        </div>
      `;

      return item;
    }

    deleteConversation(convId) {
      const t = this.translations[this.state.language];
      if (window.confirm(t.confirmDeleteConversation)) {
        delete this.state.conversations[convId];
        this.state.uncategorizedOrder = this.state.uncategorizedOrder.filter(
          (id) => id !== convId
        );
        Object.values(this.state.folders).forEach((folder) => {
          folder.convIds = folder.convIds.filter((id) => id !== convId);
        });
        if (this.state.currentConversationId === convId) {
          this.startNewConversation();
        } else {
          this.renderConversationList();
        }
        this.saveStateToStorage();
      }
    }

    togglePinConversation(convId) {
      const conversation = this.state.conversations[convId];
      if (conversation) {
        conversation.isPinned = !conversation.isPinned;
        this.sortUncategorized();
        this.renderConversationList();
        this.saveStateToStorage();
      }
    }

    toggleActionMenu(actionsContainer) {
      document
        .querySelectorAll(".conversation-actions.menu-open")
        .forEach((menu) => {
          if (menu !== actionsContainer) {
            menu.classList.remove("menu-open");
          }
        });
      actionsContainer.classList.toggle("menu-open");
    }

    startTitleEdit(convId) {
      const convItem = this.questionsContainer.querySelector(
        `.question-item[data-conv-id="${convId}"]`
      );
      const titleSpan = convItem.querySelector(".conversation-title");
      if (!convItem || !titleSpan || convItem.classList.contains("editing"))
        return;

      convItem.classList.add("editing");
      const currentTitle = this.state.conversations[convId].title;
      const input = document.createElement("input");
      input.type = "text";
      input.className = "title-edit-input";
      input.value = currentTitle;

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.saveTitleEdit(input, convId);
        if (e.key === "Escape") this.cancelTitleEdit(convId);
      });
      input.addEventListener("blur", () => this.cancelTitleEdit(convId));

      titleSpan.replaceWith(input);
      input.focus();
      input.select();
    }

    saveTitleEdit(inputElement, convId) {
      const newTitle = inputElement.value.trim();
      if (newTitle) {
        this.state.conversations[convId].title = newTitle;
        this.saveStateToStorage();
      }
      const convItem = this.questionsContainer.querySelector(
        `.question-item[data-conv-id="${convId}"]`
      );
      if (convItem) convItem.classList.remove("editing");
      this.renderConversationList();
    }

    cancelTitleEdit(convId) {
      const convItem = this.questionsContainer.querySelector(
        `.question-item[data-conv-id="${convId}"]`
      );
      if (convItem && convItem.classList.contains("editing")) {
        convItem.classList.remove("editing");
        this.renderConversationList();
      }
    }

    startFolderNameEdit(folderId) {
      const folderHeader = this.questionsContainer.querySelector(
        `.folder-container[data-folder-id="${folderId}"] .folder-header`
      );
      const nameSpan = folderHeader.querySelector(".folder-name");
      if (
        !folderHeader ||
        !nameSpan ||
        folderHeader.classList.contains("editing")
      )
        return;

      folderHeader.classList.add("editing");
      const currentName = this.state.folders[folderId].name;
      const input = document.createElement("input");
      input.type = "text";
      input.className = "title-edit-input";
      input.value = currentName;

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.saveFolderNameEdit(input, folderId);
        if (e.key === "Escape") this.cancelFolderNameEdit(folderId);
      });
      input.addEventListener("blur", () => this.cancelFolderNameEdit(folderId));

      nameSpan.after(input);
      input.focus();
      input.select();
    }

    saveFolderNameEdit(inputElement, folderId) {
      const newName = inputElement.value.trim();
      if (newName) {
        this.state.folders[folderId].name = newName;
        this.saveStateToStorage();
      }
      this.renderConversationList();
    }

    cancelFolderNameEdit(folderId) {
      this.renderConversationList();
    }

    deleteFolder(folderId) {
      if (!this.state.folders[folderId]) return;

      const folderName = this.state.folders[folderId].name;
      if (
        window.confirm(
          `本当に「${folderName}」フォルダを削除しますか？\n中の会話は未分類リストに戻ります。`
        )
      ) {
        const convIdsToMove = [...this.state.folders[folderId].convIds];

        delete this.state.folders[folderId];

        this.state.uncategorizedOrder.unshift(...convIdsToMove);
        this.sortUncategorized();

        this.saveStateToStorage();
        this.renderConversationList();
      }
    }

    sortUncategorized() {
      const conversations = this.state.conversations;
      this.state.uncategorizedOrder.sort((a, b) => {
        const convA = conversations[a];
        const convB = conversations[b];
        const aIsPinned = !!convA.isPinned;
        const bIsPinned = !!convB.isPinned;

        if (aIsPinned && !bIsPinned) return -1;
        if (!aIsPinned && bIsPinned) return 1;

        return b.localeCompare(a);
      });
    }

    createFolder() {
      const folderName = prompt(
        "Enter a name for the new folder:",
        "New Folder"
      );
      if (folderName && folderName.trim()) {
        const folderId = `folder_${Date.now()}`;
        this.state.folders[folderId] = {
          name: folderName.trim(),
          convIds: [],
          isCollapsed: false,
        };
        this.saveStateToStorage();
        this.renderConversationList();
      }
    }

    toggleFolder(folderId) {
      if (this.state.folders[folderId]) {
        this.state.folders[folderId].isCollapsed =
          !this.state.folders[folderId].isCollapsed;
        this.saveStateToStorage();
        this.renderConversationList();
      }
    }

    handleDragStart(e) {
      const convItem = e.target.closest(".question-item");
      if (convItem) {
        e.dataTransfer.setData("text/plain", convItem.dataset.convId);
        e.dataTransfer.effectAllowed = "move";

        const clone = convItem.cloneNode(true);

        clone.style.width = `${convItem.offsetWidth}px`;
        clone.style.backgroundColor = "rgba(40, 40, 40, 0.9)";
        clone.style.position = "absolute";
        clone.style.left = "-9999px";
        clone.style.opacity = "1";

        document.body.appendChild(clone);

        e.dataTransfer.setDragImage(
          clone,
          clone.offsetWidth / 2,
          clone.offsetHeight / 2
        );

        setTimeout(() => {
          convItem.classList.add("dragging");
        }, 0);

        setTimeout(() => {
          document.body.removeChild(clone);
        }, 0);
      }
    }

    handleDragOver(e) {
      e.preventDefault();

      const draggingId = document.querySelector(".question-item.dragging")
        ?.dataset.convId;
      if (!draggingId) return;

      document
        .querySelectorAll(
          ".drop-target-before, .drop-target-after, .folder-header.drag-over"
        )
        .forEach((el) => {
          el.classList.remove(
            "drop-target-before",
            "drop-target-after",
            "drag-over"
          );
        });

      const targetItem = e.target.closest(".question-item");
      const targetFolder = e.target.closest(".folder-header");

      if (targetItem && targetItem.dataset.convId !== draggingId) {
        const rect = targetItem.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        if (e.clientY < midpoint) {
          targetItem.classList.add("drop-target-before");
        } else {
          targetItem.classList.add("drop-target-after");
        }
      } else if (targetFolder) {
        targetFolder.classList.add("drag-over");
      }
    }

    handleDragLeave(e) {
      const relatedTarget = e.relatedTarget;
      const currentTarget = e.currentTarget;
      if (!currentTarget.contains(relatedTarget)) {
        document
          .querySelectorAll(
            ".drop-target-before, .drop-target-after, .folder-header.drag-over"
          )
          .forEach((el) =>
            el.classList.remove(
              "drop-target-before",
              "drop-target-after",
              "drag-over"
            )
          );
      }
    }

    handleDrop(e) {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      if (!draggedId) return;

      const dropIndicatorBefore = document.querySelector(".drop-target-before");
      const dropIndicatorAfter = document.querySelector(".drop-target-after");
      const dropFolderHeader = document.querySelector(
        ".folder-header.drag-over"
      );

      Object.values(this.state.folders).forEach((folder) => {
        const index = folder.convIds.indexOf(draggedId);
        if (index > -1) folder.convIds.splice(index, 1);
      });
      const uncategorizedIndex =
        this.state.uncategorizedOrder.indexOf(draggedId);
      if (uncategorizedIndex > -1)
        this.state.uncategorizedOrder.splice(uncategorizedIndex, 1);

      if (dropFolderHeader) {
        const targetFolderId =
          dropFolderHeader.closest(".folder-container").dataset.folderId;
        this.state.folders[targetFolderId].convIds.push(draggedId);
        if (this.state.conversations[draggedId])
          this.state.conversations[draggedId].isPinned = false;
      } else if (dropIndicatorBefore || dropIndicatorAfter) {
        const targetElement = dropIndicatorBefore || dropIndicatorAfter;
        const targetId = targetElement.dataset.convId;
        const targetFolderContainer =
          targetElement.closest(".folder-container");

        if (targetFolderContainer) {
          const targetFolderId = targetFolderContainer.dataset.folderId;
          const targetFolder = this.state.folders[targetFolderId];
          const targetIndex = targetFolder.convIds.indexOf(targetId);

          if (dropIndicatorBefore)
            targetFolder.convIds.splice(targetIndex, 0, draggedId);
          else targetFolder.convIds.splice(targetIndex + 1, 0, draggedId);

          if (this.state.conversations[draggedId])
            this.state.conversations[draggedId].isPinned = false;
        } else {
          const targetIndex = this.state.uncategorizedOrder.indexOf(targetId);
          if (dropIndicatorBefore)
            this.state.uncategorizedOrder.splice(targetIndex, 0, draggedId);
          else
            this.state.uncategorizedOrder.splice(targetIndex + 1, 0, draggedId);
        }
      } else {
        this.state.uncategorizedOrder.unshift(draggedId);
      }

      this.sortUncategorized();

      document
        .querySelectorAll(
          ".drop-target-before, .drop-target-after, .folder-header.drag-over"
        )
        .forEach((el) =>
          el.classList.remove(
            "drop-target-before",
            "drop-target-after",
            "drag-over"
          )
        );

      this.saveStateToStorage();
      this.renderConversationList();
    }

    handleDragEnd(e) {
      const draggedItem = this.questionsContainer.querySelector(
        ".question-item.dragging"
      );
      if (draggedItem) {
        draggedItem.classList.remove("dragging");
      }
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
      this.state.isLeftSidebarActive = !this.state.isLeftSidebarActive;
      this.appContainer.classList.toggle(
        "sidebar-collapsed",
        !this.state.isLeftSidebarActive
      );
      this.hamburgerMenu.classList.toggle(
        "active",
        this.state.isLeftSidebarActive
      );
    }

    startNewConversation() {
      this.updateRightSidebarUI();
      this.toggleSearchView(false);
      this.state.currentConversationId = null;
      this.state.attachedFiles = [];
      this.updateAttachedFileUI();
      this.chatContainer.innerHTML = "";
      this.chatContainer.prepend(this.titleContainer);
      this.titleContainer.classList.remove("conversation-started");
      this.inputBox.value = "";
      this.autoResizeInput();
      this.inputBox.focus();
      this.renderConversationList();
    }

    sendMessage() {
      if (this.state.isEditing || this.state.isGenerating) return;

      const userText = this.inputBox.value.trim();
      const attachedFiles = [...this.state.attachedFiles];
      if (!userText && attachedFiles.length === 0) return;
      // AI生成開始の状態管理
      this.state.isGenerating = true;
      this.state.abortController = new AbortController();
      this.updateButtonStates();

      if (!this.titleContainer.classList.contains("conversation-started")) {
        this.titleContainer.classList.add("conversation-started");
      }

      let isNewConversation = !this.state.currentConversationId;
      if (isNewConversation) {
        const timestamp = Date.now();
        this.state.currentConversationId = `conv_${timestamp}`;
        let title = userText || attachedFiles.map((f) => f.name).join(", ");

        this.state.conversations[this.state.currentConversationId] = {
          title: title.substring(0, 35) + (title.length > 35 ? "..." : ""),
          messages: [],
          systemPrompt: this.systemPromptTextarea.value,
          model: this.aiModelSelector.value,
          temperature: parseFloat(this.temperatureSlider.value),
          max_tokens: parseInt(this.maxTokensSlider.value),
          top_p: parseFloat(this.topPSlider.value),
        };
      }

      const messageId = this.generateMessageId();
      const wrapper = document.createElement("div");
      wrapper.className = `message-wrapper user-message`;
      wrapper.dataset.messageId = messageId;
      let wrapperContent = "";

      attachedFiles.forEach((file) => {
        const fileType =
          file.name.split(".").pop().toUpperCase() +
          " File (" +
          this.formatBytes(file.content.length) +
          ")";
        wrapperContent += `
            <div class="file-attachment-bubble is-html-content">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <div class="file-info">
                <span class="file-name">${this.escapeHtml(file.name)}</span>
                <span class="file-type">${this.escapeHtml(fileType)}</span>
              </div>
            </div>`;
      });

      if (userText) {
        const processedText = marked.parse(this.escapeHtml(userText));
        wrapperContent += `<div class="chat-bubble user-bubble message-text-content">${processedText}</div>`;
      }

      wrapper.innerHTML = wrapperContent;
      this.chatContainer.appendChild(wrapper);
      this.rebuildActionButtons(wrapper, "user");
      this.logMessage("user", wrapper.innerHTML, messageId);

      const aiMessageId = this.generateMessageId();
      const loadingBubble = this.createBubble("", "ai", true, aiMessageId);
      this.getAIResponse(
        loadingBubble.querySelector(".chat-bubble"),
        aiMessageId
      );

      this.state.attachedFiles = [];
      this.updateAttachedFileUI();
      this.inputBox.value = "";
      this.autoResizeInput();

      if (isNewConversation) {
        this.state.uncategorizedOrder.unshift(this.state.currentConversationId);
        this.renderConversationList();
      } else {
        const currentTitle =
          this.state.conversations[this.state.currentConversationId].title;
        if (!currentTitle || currentTitle.trim() === "...") {
          let newTitle =
            userText || attachedFiles.map((f) => f.name).join(", ");
          this.state.conversations[this.state.currentConversationId].title =
            newTitle.substring(0, 35) + (newTitle.length > 35 ? "..." : "");
          this.renderConversationList();
        }
      }
      this.saveStateToStorage();
    }

    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
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
      const shouldSend = (
        (this.state.sendKey === "enter" && e.key === "Enter" && !e.shiftKey && !e.ctrlKey) ||
        (this.state.sendKey === "shift-enter" && e.key === "Enter" && e.shiftKey) ||
        (this.state.sendKey === "ctrl-enter" && e.key === "Enter" && e.ctrlKey)
      );
      
      if (shouldSend) {
        e.preventDefault();
        this.sendMessage();
      }
    }

    stopGeneration() {
      if (this.state.abortController) {
        this.state.abortController.abort();
        this.state.abortController = null;
      }
      this.state.isGenerating = false;
      this.updateButtonStates();
    }

    updateButtonStates() {
      if (this.state.isGenerating) {
        this.sendButton.style.display = "none";
        this.stopButton.style.display = "block";
      } else {
        this.sendButton.style.display = "block";
        this.stopButton.style.display = "none";
      this.updateButtonStates();
      }
    }

    autoResizeInput() {
      this.inputBox.style.height = "auto";
      this.inputBox.style.height = this.inputBox.scrollHeight + "px";
      this.updateButtonStates();
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

    createBubble(content, role, isLoading = false, messageId) {
      const wrapper = document.createElement("div");
      wrapper.className = `message-wrapper ${role}-message`;
      wrapper.dataset.messageId = messageId;

      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${role}-bubble`;

      if (isLoading) {
        bubble.innerHTML = '<span class="typing-indicator"></span>';
      } else {
        bubble.classList.add("message-text-content");
        this.renderMessageContent(bubble, content);
      }

      wrapper.appendChild(bubble);
      this.chatContainer.appendChild(wrapper);
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      return wrapper;
    }

    async handleFileUpload(e) {
      const files = e.target.files;
      if (!files.length) return;
      const t = this.translations[this.state.language];

      const readAsText = (file) => {
        return new Promise((resolve, reject) => {
          if (file.size > 2 * 1024 * 1024) {
            return reject(new Error(t.fileTooLarge + ` (${file.name})`));
          }

          const reader = new FileReader();
          reader.onload = (readEvent) => {
            const fileData = {
              id: `file_${Date.now()}_${Math.random()
                .toString(36)
                .substring(2, 9)}`,
              name: file.name,
              content: readEvent.target.result,
            };
            if (!file.type.startsWith("text/")) {
              fileData.content = `(Non-text file: ${file.name})`;
            }
            resolve(fileData);
          };
          reader.onerror = () =>
            reject(new Error(t.fileReadError + ` (${file.name})`));

          if (file.type.startsWith("text/")) {
            reader.readAsText(file);
          } else {
            reader.onload({ target: { result: null } });
          }
        });
      };

      try {
        const newFiles = await Promise.all(Array.from(files).map(readAsText));
        newFiles.forEach((newFile) => {
          if (
            !this.state.attachedFiles.some(
              (existingFile) => existingFile.name === newFile.name
            )
          ) {
            this.state.attachedFiles.push(newFile);
          }
        });
        this.updateAttachedFileUI();
      } catch (error) {
        alert(error.message);
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

    handleCopyMessageContent(button, messageId) {
      const t = this.translations[this.state.language];
      const messageWrapper = this.chatContainer.querySelector(
        `.message-wrapper[data-message-id="${messageId}"]`
      );
      if (!messageWrapper) return;

      const textContentElement = messageWrapper.querySelector(
        ".message-text-content"
      );
      let contentToCopy = "";

      if (textContentElement) {
        contentToCopy = textContentElement.textContent || "";
      } else {
        const fileInfos = Array.from(
          messageWrapper.querySelectorAll(".file-name")
        );
        contentToCopy = fileInfos.map((info) => info.textContent).join("\n");
      }

      if (!contentToCopy) return;

      navigator.clipboard
        .writeText(contentToCopy.trim())
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

      let indicesToDelete = [messageIndex];
      const message = conv.messages[messageIndex];

      if (
        message.role === "user" &&
        conv.messages[messageIndex + 1]?.role === "assistant"
      ) {
        indicesToDelete.push(messageIndex + 1);
      }

      const idsToDelete = indicesToDelete.map((i) => conv.messages[i].id);

      idsToDelete.forEach((id) => {
        const el = this.chatContainer.querySelector(
          `.message-wrapper[data-message-id="${id}"]`
        );
        if (el) el.remove();
      });

      conv.messages = conv.messages.filter((m) => !idsToDelete.includes(m.id));

      this.saveStateToStorage();
    }

    handleRegenerate(messageId) {
      const conv = this.state.conversations[this.state.currentConversationId];
      if (!conv) return;

      const messageIndex = conv.messages.findIndex((m) => m.id === messageId);
      if (
        messageIndex === -1 ||
        conv.messages[messageIndex].role !== "assistant"
      )
        return;

      let userMessageIndex = -1;
      for (let i = messageIndex - 1; i >= 0; i--) {
        if (conv.messages[i].role === "user") {
          userMessageIndex = i;
          break;
        }
      }

      if (userMessageIndex === -1) return;

      const messagesToDelete = conv.messages.splice(userMessageIndex + 1);
      messagesToDelete.forEach((msg) => {
        const el = this.chatContainer.querySelector(
          `[data-message-id="${msg.id}"]`
        );
        if (el) el.remove();
      });

      const newAiMessageId = this.generateMessageId();
      const loadingBubble = this.createBubble("", "ai", true, newAiMessageId);
      this.getAIResponse(
        loadingBubble.querySelector(".chat-bubble"),
        newAiMessageId
      );
      this.saveStateToStorage();
    }

    handleEditMessage(messageId) {
      const wrapper = this.chatContainer.querySelector(
        `[data-message-id="${messageId}"]`
      );
      if (!wrapper) return;
      const textBubble = wrapper.querySelector(".message-text-content");
      if (!textBubble || this.state.isEditing) return;

      this.state.isEditing = true;
      const t = this.translations[this.state.language];
      const originalText = textBubble.textContent;

      wrapper.dataset.originalText = originalText;

      const textarea = document.createElement("textarea");
      textarea.className = "edit-textarea";
      textarea.value = originalText;

      textBubble.innerHTML = "";
      textBubble.appendChild(textarea);

      const actions = wrapper.querySelector(".message-actions");
      actions.innerHTML = `<button class="message-action-btn edit-save-btn" title="${t.save}">✓ ${t.save}</button><button class="message-action-btn edit-cancel-btn" title="${t.cancel}">✗ ${t.cancel}</button>`;

      textarea.focus();
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    handleSaveEdit(messageId) {
      const wrapper = this.chatContainer.querySelector(
        `[data-message-id="${messageId}"]`
      );
      const textarea = wrapper.querySelector(".edit-textarea");
      if (!textarea) return;
      const newText = textarea.value.trim();

      this.state.isEditing = false;
      const conv = this.state.conversations[this.state.currentConversationId];
      const msgIndex = conv.messages.findIndex((m) => m.id === messageId);

      if (newText && newText !== wrapper.dataset.originalText) {
        const originalHTML = conv.messages[msgIndex].content;
        const parser = new DOMParser();
        const doc = parser.parseFromString(originalHTML, "text/html");
        const textElement = doc.querySelector(".message-text-content");
        if (textElement) {
          textElement.innerHTML = marked.parse(this.escapeHtml(newText));
        }
        const updatedHTML = new XMLSerializer().serializeToString(
          doc.body.firstChild
        );

        conv.messages[msgIndex].content = updatedHTML;
        wrapper.innerHTML = updatedHTML;
        this.rebuildActionButtons(wrapper, "user");

        const nextMessage = conv.messages[msgIndex + 1];
        if (nextMessage && nextMessage.role === "assistant") {
          this.handleRegenerate(nextMessage.id);
        }
      } else {
        this.handleCancelEdit(messageId);
      }
      wrapper.removeAttribute("data-original-text");
      this.saveStateToStorage();
    }

    handleCancelEdit(messageId) {
      const wrapper = this.chatContainer.querySelector(
        `[data-message-id="${messageId}"]`
      );
      this.state.isEditing = false;

      const conv = this.state.conversations[this.state.currentConversationId];
      const message = conv.messages.find((m) => m.id === messageId);

      if (message) {
        wrapper.innerHTML = message.content;
        this.rebuildActionButtons(wrapper, "user");
      }
      wrapper.removeAttribute("data-original-text");
    }

    rebuildActionButtons(wrapper, role) {
      if (!wrapper) return;

      const t = this.translations[this.state.language];
      let actions = wrapper.querySelector(".message-actions");
      if (actions) actions.remove();

      actions = document.createElement("div");
      actions.className = "message-actions";
      let actionsHtml = "";

      if (role === "ai") {
        actionsHtml += `<button class="message-action-btn" data-action="regenerate" title="${t.regenerate}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12q0 3.328-2.336 5.664T12 20t-5.664-2.336T4 12t2.336-5.664T12 4q1.734 0 3.258.742T17.89 7M20 7V4h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      }

      if (role === "user" && wrapper.querySelector(".message-text-content")) {
        actionsHtml += `<button class="message-action-btn" data-action="edit" title="${t.edit}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      }

      actionsHtml += `<button class="message-action-btn" data-action="copy" title="${t.copyMessage}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4-2a2 2 0 0 1 2-2h-4a2 2 0 0 0-2 2v2h8V4a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      actionsHtml += `<button class="message-action-btn" data-action="delete" title="${t.delete}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;

      if (actionsHtml) {
        actions.innerHTML = actionsHtml;
        wrapper.appendChild(actions);
      }
    }

    updateAttachedFileUI() {
      if (this.state.attachedFiles.length > 0) {
        const filesHtml = this.state.attachedFiles
          .map(
            (file) => `
            <div class="attached-file-item">
                <span>${this.escapeHtml(file.name)}</span>
                <button class="remove-file-button" data-file-id="${
                  file.id
                }" title="Remove file">&times;</button>
            </div> `
          )
          .join("");
        this.attachedFileDisplay.innerHTML = filesHtml;
        this.attachedFileDisplay.style.display = "flex";
      } else {
        this.attachedFileDisplay.innerHTML = "";
        this.attachedFileDisplay.style.display = "none";
      }
      this.autoResizeInput();
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
      if (!conv || !conv.messages) return;

      const messagesForApi = [];
      if (conv.systemPrompt) {
        messagesForApi.push({ role: "system", content: conv.systemPrompt });
      }

      conv.messages.forEach((msg) => {
        if (msg.role === "user" || msg.role === "assistant") {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = msg.content;
          const textContent = tempDiv.textContent || "";
          messagesForApi.push({ role: msg.role, content: textContent });
        }
      });

      const isStreaming = this.streamingToggle.checked;
      const apiUrl = "https://free.v36.cm/v1/chat/completions";
      let fullResponse = "";
      const loadingWrapper = aiBubbleElement.closest(".message-wrapper");

      const apiSettings = {
        model: conv.model || "gpt-4o-mini",
        temperature: conv.temperature !== undefined ? conv.temperature : 1,
        max_tokens: conv.max_tokens || 2048,
        top_p: conv.top_p !== undefined ? conv.top_p : 1,
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.apiKey}`,
          },
          body: JSON.stringify({
            ...apiSettings,
            messages: messagesForApi,
            stream: isStreaming,
          signal: this.state.abortController?.signal,
          }),
        });

        if (!response.ok)
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );

        loadingWrapper.innerHTML = "";
        const responseBubble = document.createElement("div");
        responseBubble.className = "chat-bubble ai-bubble message-text-content";
        loadingWrapper.appendChild(responseBubble);
        this.rebuildActionButtons(loadingWrapper, "ai");

        if (isStreaming && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          const cursorSpan = '<span class="typing-cursor">▌</span>';
          responseBubble.innerHTML = cursorSpan;

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
                    responseBubble.innerHTML = marked.parse(
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

        responseBubble.innerHTML = marked.parse(fullResponse);
        this.logMessage("assistant", responseBubble.outerHTML, aiMessageId);
        this.saveStateToStorage();
        this.renderMessageContent(responseBubble, fullResponse);
      } catch (error) {
        console.error("AI API call error:", error);
        fullResponse = t.aiError + error.message;
        const errorHtml = `<div class="chat-bubble ai-bubble message-text-content">${marked.parse(fullResponse)}</div>`;
        this.logMessage("assistant", errorHtml, aiMessageId);
        this.saveStateToStorage();
        if (loadingWrapper) loadingWrapper.innerHTML = errorHtml;
      } finally {
        // 生成完了時の状態リセット
        this.state.isGenerating = false;
        this.state.abortController = null;
        this.updateButtonStates();
      }
    }

    toggleSearchView(show) {
      const isVisible = this.searchView.classList.contains("active");
      const showSearchView = show !== undefined ? show : !isVisible;

      if (showSearchView) {
        this.populateSearchResults();
        this.searchView.classList.add("active");
        this.searchInput.focus();
      } else {
        this.searchView.classList.remove("active");
        this.searchInput.value = "";
      }
    }

    populateSearchResults(filter = "") {
      this.searchResultsContainer.innerHTML = "";
      const conversationIds = Object.keys(this.state.conversations).sort(
        (a, b) => b.localeCompare(a)
      );

      const filteredIds = conversationIds.filter((id) => {
        const conversation = this.state.conversations[id];
        const title = conversation.title || "";
        return title.toLowerCase().includes(filter.toLowerCase());
      });

      if (filteredIds.length === 0) {
        this.searchResultsContainer.innerHTML = `<div class="search-no-results">No conversations found.</div>`;
        return;
      }

      filteredIds.forEach((id) => {
        const conversation = this.state.conversations[id];
        const item = document.createElement("div");
        item.className = "search-result-item";
        const cleanTitle = conversation.title
          .replace(/<[^>]*>?/gm, "")
          .substring(0, 100);
        item.textContent =
          cleanTitle + (conversation.title.length > 100 ? "..." : "");
        item.dataset.convId = id;
        item.addEventListener("click", () => {
          this.loadConversation(id);
          this.toggleSearchView(false);
        });
        this.searchResultsContainer.appendChild(item);
      });
    }

    performSearch() {
      const query = this.searchInput.value;
      this.populateSearchResults(query);
    }

    escapeHtml(str) {
      if (!str) return "";
      return str.replace(/[&<>"']/g, function (m) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        }[m];
      });
    }
    // --- ここから下のメソッドをすべてクラスの末尾に追加 ---

    downloadJSON(data, filename) {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    exportConversation(convId) {
      const conversation = this.state.conversations[convId];
      if (!conversation) return;

      const filename = `QuestIO_conversation_${conversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.json`;
      this.downloadJSON({ conversation }, filename);
    }

    exportAllConversations() {
      const dataToExport = {
        conversations: this.state.conversations,
        folders: this.state.folders,
        uncategorizedOrder: this.state.uncategorizedOrder,
      };
      const timestamp = new Date()
        .toISOString()
        .replace(/:/g, "-")
        .slice(0, 19);
      const filename = `QuestIO_all_conversations_${timestamp}.json`;
      this.downloadJSON(dataToExport, filename);
    }

    importConversations() {
      const t = this.translations[this.state.language];
      if (!window.confirm(t.confirmImport)) return;

      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (readEvent) => {
          try {
            const importedData = JSON.parse(readEvent.target.result);

            // --- データマージ処理 ---
            if (importedData.conversation) {
              // 単一会話のインポート
              const newId = `conv_${Date.now()}`;
              this.state.conversations[newId] = importedData.conversation;
              this.state.uncategorizedOrder.unshift(newId);
            } else if (importedData.conversations && importedData.folders) {
              // 全データのエクスポートファイル
              const idMap = {};

              // 新しいIDを生成
              Object.keys(importedData.conversations).forEach((oldId) => {
                idMap[oldId] =
                  `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
              });

              // 会話データをマージ
              for (const oldId in importedData.conversations) {
                const newId = idMap[oldId];
                this.state.conversations[newId] =
                  importedData.conversations[oldId];
              }

              // フォルダデータをマージ (IDを置換)
              for (const folderId in importedData.folders) {
                const newFolderId = `folder_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
                const newConvIds = importedData.folders[folderId].convIds
                  .map((oldId) => idMap[oldId])
                  .filter(Boolean);
                this.state.folders[newFolderId] = {
                  ...importedData.folders[folderId],
                  convIds: newConvIds,
                };
              }

              // 未分類リストをマージ (IDを置換)
              const newUncategorized = importedData.uncategorizedOrder
                .map((oldId) => idMap[oldId])
                .filter(Boolean);
              this.state.uncategorizedOrder.unshift(...newUncategorized);
            } else {
              throw new Error("Invalid file structure");
            }

            this.sortUncategorized();
            this.saveStateToStorage();
            this.renderConversationList();
            alert(t.importSuccess);
          } catch (error) {
            console.error("Import error:", error);
            alert(t.importError);
          }
        };
        reader.readAsText(file);
      };
      input.click();
    }
    // in class QuestIO {}
    // ... 既存のメソッド ...

    // --- ここから下のメソッド群をクラスの末尾に追加 ---
    toggleRightSidebar(forceState) {
      const show =
        forceState !== undefined
          ? forceState
          : !this.state.isRightSidebarActive;
      this.state.isRightSidebarActive = show;
      this.appContainer.classList.toggle("right-sidebar-active", show);
    }

    updateRightSidebarUI(conversationId = null) {
      const conv = conversationId
        ? this.state.conversations[conversationId]
        : null;

      // 値を設定、convがなければデフォルト値
      this.systemPromptTextarea.value = conv?.systemPrompt || "";
      this.aiModelSelector.value = conv?.model || "gpt-4o-mini";
      this.temperatureSlider.value =
        conv?.temperature !== undefined ? conv.temperature : 1;
      this.maxTokensSlider.value = conv?.max_tokens || 2048;
      this.topPSlider.value = conv?.top_p !== undefined ? conv.top_p : 1;

      // 表示を更新
      this.temperatureValue.textContent = parseFloat(
        this.temperatureSlider.value
      ).toFixed(2);
      this.maxTokensValue.textContent = this.maxTokensSlider.value;
      this.topPValue.textContent = parseFloat(this.topPSlider.value).toFixed(2);

      // 会話が開かれていない場合は無効化
      const isDisabled = !conversationId;
      this.rightSidebar
        .querySelectorAll("textarea, select, input")
        .forEach((el) => (el.disabled = isDisabled));
    }

    saveCurrentConversationSettings() {
      const convId = this.state.currentConversationId;
      if (!convId || !this.state.conversations[convId]) return;

      const conv = this.state.conversations[convId];
      conv.systemPrompt = this.systemPromptTextarea.value;
      conv.model = this.aiModelSelector.value;
      conv.temperature = parseFloat(this.temperatureSlider.value);
      conv.max_tokens = parseInt(this.maxTokensSlider.value);
      conv.top_p = parseFloat(this.topPSlider.value);

      this.saveStateToStorage();
    }

// script.js 内の initResizers() メソッドを探し、以下の内容に置き換える

initResizers() {
  // isDraggingフラグを追加して、クリックとドラッグを区別
  let isDragging = false; 

  const initResizer = (handleEl, sidebarEl, direction) => {
    handleEl.addEventListener("mousedown", (e) => {
      // ドラッグ開始直後はフラグをfalseに
      isDragging = false;
      e.preventDefault();

      const handleMouseMove = (moveEvent) => {
        // 最初のマウスムーブでドラッグと判定
        if (!isDragging) {
          isDragging = true;
          document.body.classList.add("is-resizing");
        }
        
        let newWidth;
        if (direction === "left") {
          newWidth = moveEvent.clientX;
        } else { // right
          newWidth = window.innerWidth - moveEvent.clientX;
        }

        // 幅の最小値・最大値を設定
        newWidth = Math.max(240, Math.min(newWidth, 600));

        const propertyName = direction === 'left' ? '--sidebar-left-width' : '--sidebar-right-width';
        document.documentElement.style.setProperty(propertyName, `${newWidth}px`);
      };

      const handleMouseUp = () => {
        // ドラッグ中だった場合のみ幅を保存
        if (isDragging) {
          const finalWidth = sidebarEl.offsetWidth;
          const storageKey = direction === 'left' ? 'sidebarLeftWidth' : 'sidebarRightWidth';
          localStorage.setItem(storageKey, `${finalWidth}px`);
        }
        
        document.body.classList.remove("is-resizing");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // すぐにisDraggingをリセット
        setTimeout(() => { isDragging = false; }, 0); 
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });

    // クリックイベントを追加して、ドラッグでなければ開閉を実行
    handleEl.addEventListener('click', (e) => {
        if (isDragging) {
            // ドラッグ操作だった場合はクリックイベントを無視
            e.stopPropagation();
            return;
        }
        // ドラッグでない単純なクリックの場合は、通常の開閉処理を実行
        if (direction === 'left') {
            this.toggleSidebar();
        } else { // right
            this.toggleRightSidebar();
        }
    });
  };

  initResizer(this.hamburgerMenu, this.sidebar, "left");
  initResizer(this.convSettingsMenuButton, this.rightSidebar, "right");
}

    throttle(func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    }
  }
  new QuestIO();
});


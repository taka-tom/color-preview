// ==============================
// カラー設定
// ==============================

const colorSettings = [
  {
    key: "bg",
    variable: "--bg-color",
    grid: "bgGrid",
    gridCursor: "bgGridCursor",
    hue: "bgHue",
    hueCursor: "bgHueCursor",
    lightness: "bgLightness",
    picker: "bgColorPicker",
    input: "bgColor",
    sample: "bgSample",
    code: "bgCode"
  },
  {
    key: "text",
    variable: "--text-color",
    grid: "textGrid",
    gridCursor: "textGridCursor",
    hue: "textHue",
    hueCursor: "textHueCursor",
    lightness: "textLightness",
    picker: "textColorPicker",
    input: "textColor",
    sample: "textSample",
    code: "textCode"
  },
  {
    key: "accent",
    variable: "--accent-color",
    grid: "accentGrid",
    gridCursor: "accentGridCursor",
    hue: "accentHue",
    hueCursor: "accentHueCursor",
    lightness: "accentLightness",
    picker: "accentColorPicker",
    input: "accentColor",
    sample: "accentSample",
    code: "accentCode"
  },
  {
    key: "sub",
    variable: "--accent-light",
    grid: "subGrid",
    gridCursor: "subGridCursor",
    hue: "subHue",
    hueCursor: "subHueCursor",
    lightness: "subLightness",
    picker: "subColorPicker",
    input: "subColor",
    sample: "subSample",
    code: "subCode"
  }
];


// ==============================
// HEX → RGB
// ==============================

function hexToRgb(hex) {
  hex = hex.replace("#", "");

  if (hex.length !== 6) {
    return null;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}


// ==============================
// RGB → HSV
// ==============================

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;

  if (d !== 0) {
    if (max === r) {
      h = ((g - b) / d) % 6;
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }

    h *= 60;

    if (h < 0) {
      h += 360;
    }
  }

  const s = max === 0 ? 0 : d / max;
  const v = max;

  return { h, s, v };
}


// ==============================
// HSV → RGB
// ==============================

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}


// ==============================
// RGB → HEX
// ==============================

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(value => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}


// ==============================
// 色相からHEXを作る
// ==============================

function hueToHex(h) {
  const rgb = hsvToRgb(h, 1, 1);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}


// ==============================
// カラー状態
// ==============================

const states = {};


// ==============================
// 各カラーを初期化
// ==============================

colorSettings.forEach(setting => {

  const input = document.getElementById(setting.input);
  const picker = document.getElementById(setting.picker);

  const rgb = hexToRgb(input.value);

  if (!rgb) return;

  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

  states[setting.key] = {
    h: hsv.h,
    s: hsv.s,
    v: hsv.v
  };

  updateColor(setting);

  // ------------------------------
  // HEX入力
  // ------------------------------

  input.addEventListener("input", () => {

    let value = input.value.trim();

    if (!value.startsWith("#")) {
      value = "#" + value;
    }

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {

      const rgb = hexToRgb(value);

      const hsv = rgbToHsv(
        rgb.r,
        rgb.g,
        rgb.b
      );

      states[setting.key] = {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v
      };

      picker.value = value;

      updateColor(setting);
    }
  });


  // ------------------------------
  // カラーピッカー
  // ------------------------------

  picker.addEventListener("input", () => {

    const rgb = hexToRgb(picker.value);

    const hsv = rgbToHsv(
      rgb.r,
      rgb.g,
      rgb.b
    );

    states[setting.key] = {
      h: hsv.h,
      s: hsv.s,
      v: hsv.v
    };

    updateColor(setting);
  });


  // ------------------------------
  // グリッド
  // ------------------------------

  const grid = document.getElementById(setting.grid);

  grid.addEventListener("pointerdown", event => {

    grid.setPointerCapture(event.pointerId);

    updateFromGrid(
      setting,
      event
    );
  });

  grid.addEventListener("pointermove", event => {

    if (grid.hasPointerCapture(event.pointerId)) {

      updateFromGrid(
        setting,
        event
      );
    }
  });


  // ------------------------------
  // スペクトラム
  // ------------------------------

  const hue = document.getElementById(setting.hue);

  hue.addEventListener("pointerdown", event => {

    hue.setPointerCapture(event.pointerId);

    updateFromHue(
      setting,
      event
    );
  });

  hue.addEventListener("pointermove", event => {

    if (hue.hasPointerCapture(event.pointerId)) {

      updateFromHue(
        setting,
        event
      );
    }
  });


  // ------------------------------
  // 明るさスライダー
  // ------------------------------

  const lightness =
    document.getElementById(setting.lightness);

  lightness.addEventListener("input", () => {

    states[setting.key].v =
      Number(lightness.value) / 100;

    updateColor(setting);
  });

});


// ==============================
// グリッドから色を取得
// ==============================

function updateFromGrid(setting, event) {

  const grid =
    document.getElementById(setting.grid);

  const rect =
    grid.getBoundingClientRect();

  let x =
    (event.clientX - rect.left) / rect.width;

  let y =
    (event.clientY - rect.top) / rect.height;

  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));

  states[setting.key].s = x;
  states[setting.key].v = 1 - y;

  updateColor(setting);
}


// ==============================
// スペクトラムから色相を取得
// ==============================

function updateFromHue(setting, event) {

  const hue =
    document.getElementById(setting.hue);

  const rect =
    hue.getBoundingClientRect();

  let y =
    (event.clientY - rect.top) / rect.height;

  y = Math.max(0, Math.min(1, y));

  states[setting.key].h =
    y * 360;

  updateColor(setting);
}


// ==============================
// カラーを更新
// ==============================

function updateColor(setting) {

  const state =
    states[setting.key];

  const rgb =
    hsvToRgb(
      state.h,
      state.s,
      state.v
    );

  const hex =
    rgbToHex(
      rgb.r,
      rgb.g,
      rgb.b
    );


  // ------------------------------
  // CSS変数
  // ------------------------------

  document.documentElement.style.setProperty(
    setting.variable,
    hex
  );


  // ------------------------------
  // HEX入力
  // ------------------------------

  const input =
    document.getElementById(setting.input);

  input.value = hex;


  // ------------------------------
  // カラーピッカー
  // ------------------------------

  const picker =
    document.getElementById(setting.picker);

  picker.value = hex;


  // ------------------------------
  // サンプル
  // ------------------------------

  const sample =
    document.getElementById(setting.sample);

  sample.style.backgroundColor = hex;


  // ------------------------------
  // コード表示
  // ------------------------------

  const code =
    document.getElementById(setting.code);

  code.textContent = hex;


  // ------------------------------
  // グリッド背景
  // ------------------------------

  const grid =
    document.getElementById(setting.grid);

  grid.style.background =
    `
      linear-gradient(
        to top,
        #000000,
        transparent
      ),
      linear-gradient(
        to right,
        #ffffff,
        ${hueToHex(state.h)}
      )
    `;


  // ------------------------------
  // グリッドカーソル
  // ------------------------------

  const gridCursor =
    document.getElementById(setting.gridCursor);

  gridCursor.style.left =
    `${state.s * 100}%`;

  gridCursor.style.top =
    `${(1 - state.v) * 100}%`;


  // ------------------------------
  // スペクトラムカーソル
  // ------------------------------

  const hueCursor =
    document.getElementById(setting.hueCursor);

  hueCursor.style.top =
    `${(state.h / 360) * 100}%`;


  // ------------------------------
  // 明るさスライダー
  // ------------------------------

  const lightness =
    document.getElementById(setting.lightness);

  lightness.value =
    state.v * 100;
}


// ==============================
// 初期設定
// ==============================

colorSettings.forEach(setting => {

  const input =
    document.getElementById(setting.input);

  if (input && input.value) {

    const rgb =
      hexToRgb(input.value);

    if (rgb) {

      const hsv =
        rgbToHsv(
          rgb.r,
          rgb.g,
          rgb.b
        );

      states[setting.key] = {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v
      };

      updateColor(setting);
    }
  }
});
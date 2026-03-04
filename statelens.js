/**
 * StateLens v1.0.0
 * Lightweight state visualizer using Proxy API
 */

class StateLens {
  constructor(initialState = {}) {
    this.state = this._observe(initialState);
    this._createUI();
  }

  _observe(obj) {
    const self = this;
    const handler = {
      get(target, prop) {
        const val = Reflect.get(target, prop);
        return (val && typeof val === 'object') ? new Proxy(val, handler) : val;
      },
      set(target, prop, value) {
        const result = Reflect.set(target, prop, value);
        self._updateUI();
        return result;
      }
    };
    return new Proxy(obj, handler);
  }

  _createUI() {
    this.container = document.createElement('div');
    const shadow = this.container.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: fixed; bottom: 20px; right: 20px;
        width: 300px; max-height: 400px;
        background: #1e1e1e; color: #d4d4d4;
        font-family: 'Monaco', monospace; font-size: 12px;
        border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        overflow: hidden; display: flex; flex-direction: column;
        z-index: 9999; border: 1px solid #333;
      }
      .header { padding: 10px; background: #252526; border-bottom: 1px solid #333; font-weight: bold; color: #4ec9b0; }
      .content { padding: 10px; overflow-y: auto; flex-grow: 1; white-space: pre-wrap; }
      .key { color: #9cdcfe; }
      .string { color: #ce9178; }
      .number { color: #b5cea8; }
      .boolean { color: #569cd6; }
      .changed { background: rgba(78, 201, 176, 0.2); transition: background 0.5s; }
    `;

    this.viewer = document.createElement('div');
    this.viewer.className = 'content';
    
    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = '🔍 StateLens Live Preview';

    shadow.appendChild(style);
    shadow.appendChild(header);
    shadow.appendChild(this.viewer);
    document.body.appendChild(this.container);
    
    this._updateUI();
  }

  _updateUI() {
    const json = JSON.stringify(this.state, null, 2);
    // Простая подсветка синтаксиса
    this.viewer.innerHTML = json
      .replace(/"(\w+)":/g, '<span class="key">"$1"</span>:')
      .replace(/: "(.*)"/g, ': <span class="string">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="number">$1</span>')
      .replace(/: (true|false)/g, ': <span class="boolean">$1</span>');
    
    this.viewer.classList.add('changed');
    setTimeout(() => this.viewer.classList.remove('changed'), 500);
  }
}

// Export for browser or modules
if (typeof module !== 'undefined') module.exports = StateLens;

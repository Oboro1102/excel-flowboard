import './assets/css/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/js/xlsx.full.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
const oboroPreset = definePreset(Aura, {
    semantic: {
        primary: {
            // main
            50: '#F2FBFF',
            100: '#E6F6FF',
            200: '#BFE4FF',
            300: '#99CFFF',
            400: '#4D9AFF',
            500: '#0055ff',
            600: '#0049E6',
            700: '#0036BF',
            800: '#002999',
            900: '#001B73',
            950: '#00104A',
        },
        red: {
            // danger
            50: '#FFFAF5',
            100: '#FCF2E8',
            200: '#FADDCA',
            300: '#F5C1A9',
            400: '#ED826D',
            500: '#E53935',
            600: '#CF2E2B',
            700: '#AB1F1D',
            800: '#8A1513',
            900: '#660C0A',
            950: '#420605',
        },
        green: {
            // success
            50: '#F2FCFA',
            100: '#E8FAF5',
            200: '#C7F2E5',
            300: '#A5E8D2',
            400: '#6CD9AC',
            500: '#37c680',
            600: '#2DB36D',
            700: '#1F9454',
            800: '#14783E',
            900: '#0C5928',
            950: '#053B17',
        },
        purple: {
            // help
            50: '#FBF5FF',
            100: '#F5E8FC',
            200: '#E7CAFC',
            300: '#D5AAFA',
            400: '#A76CF5',
            500: '#7130f0',
            600: '#5F27D9',
            700: '#481BB3',
            800: '#33118F',
            900: '#220A6B',
            950: '#120445',
        },
        orange: {
            // warn
            50: '#FFFDF2',
            100: '#FFFBE6',
            200: '#FFF4BF',
            300: '#FFEC99',
            400: '#FFD54D',
            500: '#ffbb00',
            600: '#E6A100',
            700: '#BF7C00',
            800: '#995900',
            900: '#733D00',
            950: '#4A2300',
        },
        sky: {
            // info
            50: '#F2FCFF',
            100: '#E8F9FF',
            200: '#C2EBFC',
            300: '#9BDAFA',
            400: '#54B6F7',
            500: '#0f88f2',
            600: '#0B73DB',
            700: '#0758B5',
            800: '#064291',
            900: '#032C6E',
            950: '#011A47',
        },
        slate: {
            // secondary && contrast & tooltip bg
            50: '#F2F6F7',
            100: '#E9EFF2',
            200: '#C8D4DE',
            300: '#ABBCCC',
            400: '#7688A3',
            500: '#4B5A7D',
            600: '#3D4B70',
            700: '#2A385E',
            800: '#1B264A',
            900: '#0F1838',
            950: '#060C24',
        },
    },
    components: {
        card: {
            title: {
                fontSize: '1rem',
            },
        },
        button: {
            root: {
                borderRadius: 'var(--radius-site)',
                label: { fontWeight: '400' },
            },
            css: ({ dt }) => `
        .p-button:disabled {
            pointer-events: auto;
            cursor: not-allowed;
        },
    `,
        },
        inputtext: {
            root: {
                borderRadius: 'var(--radius-site)',
            },
        },
        select: {
            root: {
                borderRadius: 'var(--radius-site)',
            },
            css: ({ dt }) => `
        .p-select-empty-message {
          color: var(--color-noteLight);
          text-align: center;
          font-size: var(--text-sm);
          line-height: var(--tw-leading, var(--text-sm--line-height));
          font-weight: var(--font-weight-medium);
          letter-spacing: var(--tracking-wider);
        }
    `,
        },
        multiselect: {
            root: {
                borderRadius: 'var(--radius-site)',
            },
            css: ({ dt }) => `
        .p-multiselect-empty-message {
          color: var(--color-noteLight);
          text-align: center;
          font-size: var(--text-sm);
          line-height: var(--tw-leading, var(--text-sm--line-height));
          font-weight: var(--font-weight-medium);
          letter-spacing: var(--tracking-wider);
        }
    `,
        },
        tieredmenu: {
            root: {
                borderRadius: 'var(--radius-site)',
                shadow:
                    '0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1))',
            },
            css: ({ dt }) => `
        .p-tieredmenu {
          min-width: auto;
          border: none;
    `,
        },
        textarea: {
            root: {
                borderRadius: 'var(--radius-site)',
            },
        },
        tag: {
            root: {
                borderRadius: 'var(--radius-site)',
            },
        },
        floatlabel: {
            css: ({ dt }) => `
        .p-floatlabel {
          display: flex;
          flex-direction: column;
        }
    `,
        },
        popover: {
            root: {
                shadow: 'none',
            },
            css: ({ dt }) => `
        .p-popover:after,
        .p-popover:before {
          left: calc(0.95rem + var(--p-popover-arrow-left))
        }
    `,
        },
        confirmpopup: {
            root: {
                shadow: 'none',
            },
        },
        datatable: {
            header: {
                background: 'none',
                padding: '0.75rem 0',
            },
            headerCell: {
                background: 'none',
            },
        },
        drawer: {
            header: {
                padding: '1rem',
            },
            title: {
                fontSize: '1.25rem',
            },
            content: {
                padding: '0 1rem 1rem',
            },
            footer: {
                padding: '0 1rem 1rem',
            },
        },
        dialog: {
            header: {
                padding: '1rem',
            },
            title: {
                fontSize: '1.25rem',
            },
            content: {
                padding: '0 1rem 1rem',
            },
            footer: {
                padding: '0 1rem 1rem',
            },
        },
        tooltip: {
            css: ({ dt }) => `
        .p-tooltip-text {
          font-size: 0.81255rem;
        }
    `,
        },
    },
})
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: oboroPreset,
        options: {
            darkModeSelector: false,
        },
    },
    locale: {
        noFileChosenMessage: '尚未選取檔案',
        today: '今日',
        clear: '清除',
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
        ],
        monthNamesShort: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
        ],
        emptyMessage: '無可選項目',
        selectionMessage: '已選取 {0} 個項目',
    },
})
import { Tooltip, ConfirmationService, ToastService } from 'primevue'
app.directive('tooltip', Tooltip)
app.use(ConfirmationService)
app.use(ToastService)

async function enableMocking() {
    const { worker } = await import('./mocks/browser.js')
    return worker.start({
        onUnhandledRequest: 'bypass',
    })
}
enableMocking().then(() => {
    console.log('MSW Worker 已啟動，開始運行 Vue App。')
    app.mount('#app')
})


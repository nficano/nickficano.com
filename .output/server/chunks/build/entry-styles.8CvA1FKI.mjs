const main = '/*! tailwindcss v4.0.5 | MIT License | https://tailwindcss.com */@layer theme,base,components,utilities;@layer theme{:host,:root{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-gray-900:oklch(.21 .034 264.665);--color-neutral-200:oklch(.922 0 0);--color-neutral-800:oklch(.269 0 0);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-xl:1.25rem;--text-xl--line-height:1.4;--text-2xl:1.5rem;--text-2xl--line-height:1.33333;--text-4xl:2.25rem;--text-4xl--line-height:1.11111;--text-6xl:3.75rem;--text-6xl--line-height:1;--text-7xl:4.5rem;--text-7xl--line-height:1;--text-8xl:6rem;--text-8xl--line-height:1;--font-weight-light:300;--font-weight-medium:500;--font-weight-bold:700;--leading-tight:1.25;--radius-md:.375rem;--ease-in-out:cubic-bezier(.4,0,.2,1);--blur-sm:8px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-font-feature-settings:var(--font-sans--font-feature-settings);--default-font-variation-settings:var( --font-sans--font-variation-settings );--default-mono-font-family:var(--font-mono);--default-mono-font-feature-settings:var( --font-mono--font-feature-settings );--default-mono-font-variation-settings:var( --font-mono--font-variation-settings )}}@layer base{*,::backdrop,::file-selector-button,:after,:before{border:0 solid;box-sizing:border-box;margin:0;padding:0}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var( --default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji" );font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var( --default-font-variation-settings,normal );-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:var( --default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace );font-feature-settings:var( --default-mono-font-feature-settings,normal );font-size:1em;font-variation-settings:var( --default-mono-font-variation-settings,normal )}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}menu,ol,ul{list-style:none}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}::file-selector-button,button,input,optgroup,select,textarea{background-color:transparent;border-radius:0;color:inherit;font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;opacity:1}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::-moz-placeholder{color:color-mix(in oklab,currentColor 50%,transparent);opacity:1}::placeholder{color:color-mix(in oklab,currentColor 50%,transparent);opacity:1}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-meridiem-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-year-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}::file-selector-button,button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.visible{visibility:visible}.sr-only{height:1px;margin:-1px;overflow:hidden;padding:0;width:1px;clip:rect(0,0,0,0);border-width:0;white-space:nowrap}.absolute,.sr-only{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.inset-0{inset:calc(var(--spacing)*0)}.top-0{top:calc(var(--spacing)*0)}.right-0{right:calc(var(--spacing)*0)}.-bottom-1{bottom:calc(var(--spacing)*-1)}.-bottom-1\\/2{bottom:-50%}.left-0{left:calc(var(--spacing)*0)}.z-10{z-index:10}.z-20{z-index:20}.\\!container{width:100%!important}@media (width >= 40rem){.\\!container{max-width:40rem!important}}@media (width >= 48rem){.\\!container{max-width:48rem!important}}@media (width >= 64rem){.\\!container{max-width:64rem!important}}@media (width >= 80rem){.\\!container{max-width:80rem!important}}@media (width >= 96rem){.\\!container{max-width:96rem!important}}.container{width:100%}@media (width >= 40rem){.container{max-width:40rem}}@media (width >= 48rem){.container{max-width:48rem}}@media (width >= 64rem){.container{max-width:64rem}}@media (width >= 80rem){.container{max-width:80rem}}@media (width >= 96rem){.container{max-width:96rem}}.m-0{margin:calc(var(--spacing)*0)}.mb-6{margin-bottom:calc(var(--spacing)*6)}.mb-8{margin-bottom:calc(var(--spacing)*8)}.mb-16{margin-bottom:calc(var(--spacing)*16)}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.table{display:table}.h-1{height:calc(var(--spacing)*1)}.h-1\\/2{height:50%}.h-auto{height:auto}.h-full{height:100%}.h-screen{height:100vh}.min-h-screen{min-height:100vh}.w-full{width:100%}.w-screen{width:100vw}.flex-1{flex:1}.shrink{flex-shrink:1}.grow{flex-grow:1}.rotate-90{rotate:90deg}.rotate-180{rotate:180deg}.rotate-270{rotate:270deg}.transform{transform:var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)}.cursor-pointer{cursor:pointer}.resize{resize:both}.columns-3{-moz-columns:3;column-count:3}.flex-col{flex-direction:column}.place-content-center{place-content:center}.items-center{align-items:center}.justify-center{justify-content:center}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-hidden{overflow-y:hidden}.rounded{border-radius:.25rem}.rounded-t-md{border-top-left-radius:var(--radius-md);border-top-right-radius:var(--radius-md)}.border{border-style:var(--tw-border-style);border-width:1px}.border-none{--tw-border-style:none;border-style:none}.bg-black{background-color:var(--color-black)}.bg-black\\/5{background-color:color-mix(in oklab,var(--color-black) 5%,transparent)}.bg-black\\/20{background-color:color-mix(in oklab,var(--color-black) 20%,transparent)}.bg-gray-900{background-color:var(--color-gray-900)}.bg-white{background-color:var(--color-white)}.fill-transparent{fill:transparent}.stroke-neutral-200{stroke:var(--color-neutral-200)}.p-0{padding:calc(var(--spacing)*0)}.p-8{padding:calc(var(--spacing)*8)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-8{padding-inline:calc(var(--spacing)*8)}.px-10{padding-inline:calc(var(--spacing)*10)}.py-2{padding-block:calc(var(--spacing)*2)}.pt-14{padding-top:calc(var(--spacing)*14)}.text-center{text-align:center}.font-\\[helvetica\\]{font-family:helvetica}.font-sans{font-family:var(--font-sans)}.text-6xl{font-size:var(--text-6xl);line-height:var(--tw-leading,var(--text-6xl--line-height))}.text-7xl{font-size:var(--text-7xl);line-height:var(--tw-leading,var(--text-7xl--line-height))}.text-8xl{font-size:var(--text-8xl);line-height:var(--tw-leading,var(--text-8xl--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-light{--tw-font-weight:var(--font-weight-light);font-weight:var(--font-weight-light)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.text-black{color:var(--color-black)}.capitalize{text-transform:capitalize}.lowercase{text-transform:lowercase}.uppercase{text-transform:uppercase}.italic{font-style:italic}.overline{text-decoration-line:overline}.underline{text-decoration-line:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentColor)}.ring,.shadow{box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,rgba(0,0,0,.1)),0 1px 2px -1px var(--tw-shadow-color,rgba(0,0,0,.1))}.blur{--tw-blur:blur(8px)}.blur,.drop-shadow{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.drop-shadow{--tw-drop-shadow:drop-shadow(0 1px 2px rgba(0,0,0,.1)) drop-shadow(0 1px 1px rgba(0,0,0,.06))}.\\!filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)!important}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm))}.backdrop-blur-sm,.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.\\!transition{transition-duration:var(--tw-duration,var(--default-transition-duration))!important;transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter!important;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function))!important}.transition{transition-duration:var(--tw-duration,var(--default-transition-duration));transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function))}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}@media (width >= 40rem){.sm\\:px-0{padding-inline:calc(var(--spacing)*0)}}@media (width >= 40rem){.sm\\:px-6{padding-inline:calc(var(--spacing)*6)}}@media (width >= 40rem){.sm\\:py-3{padding-block:calc(var(--spacing)*3)}}@media (width >= 40rem){.sm\\:text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}}@media (width >= 40rem){.sm\\:text-4xl{font-size:var(--text-4xl);line-height:var(--tw-leading,var(--text-4xl--line-height))}}@media (width >= 40rem){.sm\\:text-8xl{font-size:var(--text-8xl);line-height:var(--tw-leading,var(--text-8xl--line-height))}}@media (width >= 40rem){.sm\\:text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}}@media (width >= 48rem){.md\\:hidden{display:none}}@media (prefers-color-scheme:dark){.dark\\:bg-black{background-color:var(--color-black)}}@media (prefers-color-scheme:dark){.dark\\:bg-white\\/10{background-color:color-mix(in oklab,var(--color-white) 10%,transparent)}}@media (prefers-color-scheme:dark){.dark\\:stroke-neutral-800{stroke:var(--color-neutral-800)}}@media (prefers-color-scheme:dark){.dark\\:text-white{color:var(--color-white)}}}:root{--space:1rem;--bg:#09090b;--fg:#e3e3e3;--surface-1:#101012;--surface-2:#27272a;--surface-3:#52525b;--ease-out:cubic-bezier(.5,1,.89,1);--ease-in-out:cubic-bezier(.45,0,.55,1)}*{box-sizing:border-box}body,height{height:100%}body{background:var(--bg);color:var(--fg);display:grid;min-height:100vh;padding:var(--space)}main{display:grid;gap:var(--space);grid-template-columns:repeat(var(--count,1),1fr);inline-size:min(var(--max,15rem),100%);margin:auto}@media (min-width:25rem){main{--count:2;--max:30rem}}@media (min-width:45rem){main{--count:4;--max:60rem}}@layer utilities{.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}}@property --tw-rotate-x{syntax:"*";inherits:false;initial-value:rotateX(0)}@property --tw-rotate-y{syntax:"*";inherits:false;initial-value:rotateY(0)}@property --tw-rotate-z{syntax:"*";inherits:false;initial-value:rotateZ(0)}@property --tw-skew-x{syntax:"*";inherits:false;initial-value:skewX(0)}@property --tw-skew-y{syntax:"*";inherits:false;initial-value:skewY(0)}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}';

const entryStyles_8CvA1FKI = [main];

export { entryStyles_8CvA1FKI as default };
//# sourceMappingURL=entry-styles.8CvA1FKI.mjs.map

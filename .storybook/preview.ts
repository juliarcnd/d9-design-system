import type { Preview, Decorator } from "@storybook/react"
import { withThemeByDataAttribute } from "@storybook/addon-themes"
import "../src/styles/fonts.css"
import "../src/styles/base.css"

// ─── Brand switcher decorator ────────────────────────────────────────────────
// Lê o global `brand` e aplica data-brand no wrapper do story.
const withBrand: Decorator = (Story, context) => {
  const brand = (context.globals["brand"] as string) ?? "tech"
  const root = document.documentElement
  root.setAttribute("data-brand", brand)
  return Story()
}

const preview: Preview = {
  decorators: [
    withBrand,
    withThemeByDataAttribute({
      themes: { Dark: "dark", Light: "light" },
      defaultTheme: "Dark",
      attributeName: "data-theme",
    }),
  ],

  globalTypes: {
    brand: {
      name: "Brand",
      description: "Produto D9",
      defaultValue: "tech",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "tech", title: "D9 Tech", right: "#0082CF" },
          { value: "pro",  title: "D9 Pro",  right: "#766DE9" },
          { value: "pag",  title: "D9 Pag",  right: "#2F9000" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
}

export default preview

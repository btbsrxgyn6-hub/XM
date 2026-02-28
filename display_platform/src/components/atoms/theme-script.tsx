export function ThemeScript() {
  const script = `
(() => {
  try {
    const key = "attrax:theme";
    const stored = localStorage.getItem(key);
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    const resolved = theme;
    if (resolved === "dark") document.documentElement.classList.add("dark");
  } catch {
    // ignore
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

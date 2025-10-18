import RootLayout, { metadata } from "@/layout.jsx";

describe("RootLayout", () => {
  it('returns an <html lang="en"> element with a <body> wrapping children', () => {
    const element = RootLayout({ children: <div>Hello from layout</div> });

    // Root is <html lang="en">
    expect(element?.type).toBe("html");
    expect(element?.props?.lang).toBe("en");

    // Its child is <body>...
    const bodyEl = Array.isArray(element?.props?.children)
      ? element?.props?.children[0]
      : element?.props?.children;
    expect(bodyEl?.type).toBe("body");

    // ...that wraps our provided child
    const childEl = Array.isArray(bodyEl?.props?.children)
      ? bodyEl?.props?.children[0]
      : bodyEl?.props?.children;
    expect(childEl?.type).toBe("div");
    expect(childEl?.props?.children).toMatch(/hello from layout/i);
  });

  it("exposes base metadata fields", () => {
    expect(metadata).toBeDefined();
    expect(metadata).toMatchObject({
      title: expect.any(String),
      description: expect.any(String),
    });
  });
});

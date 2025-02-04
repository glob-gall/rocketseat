export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receive a string (text) and normalize it as a slug
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/_/g, '-')
      .replace(/[^a-zA-Z0-9\\-]+/g, '')
      .replace(/--/g, '-')
      .replace(/^-+|-+$/g, '')

    return new Slug(slugText)
  }
}

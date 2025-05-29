import Typography from "@/components/typography";

const TypographyPage: React.FC = () => {
  return (
    <Typography>
      <h1>The Art of Typography</h1>

      <p className="callout">
        An exploration of the visual art of communication through type design,
        arrangement, and style
      </p>

      <p>
        <span>T</span>ypography is the art and technique of arranging type to
        make written language legible, readable, and appealing when displayed.
        Typography includes the selection of typefaces, point sizes, line
        lengths, line spacing, and letter spacing, and the adjustment of spaces
        between groups of letters. Typography is a cornerstone of design,
        playing a crucial role in establishing hierarchy, organization, and
        aesthetics in both print and digital media.
      </p>

      <p>
        The history of typography begins with the invention of movable type in
        China around 1040 AD by Bi Sheng. However, the Western tradition of
        typography traces its origins to Johannes Gutenberg's development of the
        printing press in the 15th century. This revolutionary invention
        democratized knowledge by making books more accessible to the general
        population, fundamentally changing the way information was shared and
        preserved.
      </p>

      <blockquote>
        Typography is what language looks like, and how it feels when we read
        it. It's the invisible art form that shapes our experience of written
        content.
        <cite>Ellen Lupton</cite>
      </blockquote>

      <p>
        As we move through the digital age, typography has evolved far beyond
        its original scope. It now encompasses a vast array of digital
        typefaces, responsive design considerations, and variable fonts that
        adapt to different screen sizes and resolutions. The principles that
        govern good typography, however, remain largely unchanged: legibility,
        readability, and visual harmony continue to be paramount.
      </p>

      <p className="callout">
        Typography is often overlooked but is one of the most important elements
        in design. It can make or break the user experience and significantly
        impact how information is perceived and processed.
      </p>

      <h2>The Elements of Typography</h2>

      <p>
        Understanding typography requires familiarity with its key elements.
        These building blocks form the foundation of typographic design and
        provide designers with the tools necessary to create effective visual
        communication. When working with modern web technologies, you'll often
        encounter CSS properties like <code>font-family</code>,{" "}
        <code>font-size</code>, and <code>line-height</code> that directly
        correspond to these typographic principles.
      </p>

      <h3>Typefaces and Fonts</h3>

      <p>
        While often used interchangeably, typefaces and fonts are distinct
        concepts. A typeface is a design of letters, numbers, and symbols (such
        as Helvetica or Times New Roman), while a font is a specific size,
        weight, and style of a typeface (such as 12-point Helvetica Bold).
        Typefaces generally fall into several categories:
      </p>

      <ul>
        <li>
          <strong>Serif:</strong> Typefaces with small lines or strokes attached
          to the ends of larger strokes in letters. Examples include Times New
          Roman and Georgia. These are traditionally associated with print media
          and formal documents.
        </li>
        <li>
          <strong>Sans-serif:</strong> Typefaces without serifs, offering a
          cleaner, more modern look. Examples include Helvetica and Arial. These
          are often preferred for digital displays due to their clarity at
          smaller sizes.
        </li>
        <li>
          <strong>Script:</strong> Typefaces that mimic handwriting or
          calligraphy, adding a personal, elegant touch. Examples include Brush
          Script and Zapfino.
        </li>
        <li>
          <strong>Monospaced:</strong> Typefaces where each character occupies
          the same amount of horizontal space. Examples include Courier and
          Consolas, commonly used for coding and technical documentation.
        </li>
        <li>
          <strong>Display:</strong> Decorative typefaces designed for use at
          large sizes in headlines and titles, often featuring unique
          characteristics that would be distracting at smaller sizes.
        </li>
      </ul>

      <p>
        Choosing the right typeface is essential for setting the tone of your
        content and ensuring it aligns with your message and audience
        expectations. Modern web developers have access to thousands of web
        fonts through services like Google Fonts, Adobe Fonts, and custom font
        hosting solutions.
      </p>

      <h3>Hierarchy and Scale</h3>

      <p>
        Typographic hierarchy refers to the organization of type elements in
        order of importance, guiding readers through content and highlighting
        key information. A well-structured typographic hierarchy typically
        follows this pattern:
      </p>

      <ol>
        <li>
          <strong>Primary headline (H1):</strong> The most important element,
          usually the page or article title
        </li>
        <li>
          <strong>Secondary headlines (H2):</strong> Major section dividers that
          break content into digestible chunks
        </li>
        <li>
          <strong>Tertiary headlines (H3-H6):</strong> Subsection headers that
          provide further organization
        </li>
        <li>
          <strong>Body text:</strong> The main content, optimized for
          comfortable reading
        </li>
        <li>
          <strong>Captions and metadata:</strong> Supporting information in
          smaller, often lighter text
        </li>
      </ol>

      <p>
        Scale plays a crucial role in establishing hierarchy, with larger
        elements naturally drawing more attention than smaller ones. The
        traditional typographic scale includes ratios like 1.2 (minor third),
        1.25 (major third), and 1.618 (golden ratio) to create harmonious size
        relationships.
      </p>

      <blockquote>
        Good typography is invisible, but its absence is immediately felt. It's
        the difference between a pleasant reading experience and a frustrating
        one.
        <cite>Robert Bringhurst</cite>
      </blockquote>

      <p>
        Effective typographic hierarchy employs variations in size, weight,
        style, and spacing to create visual distinction between different levels
        of information. This not only improves readability but also enhances the
        aesthetic appeal of the text.
      </p>

      <h2>Typography in Digital Design</h2>

      <p>
        The digital landscape has introduced new challenges and opportunities
        for typography. Designers must now consider how type will render across
        multiple devices, screen resolutions, and contexts. Modern CSS provides
        powerful tools for typographic control, including:
      </p>

      <ul>
        <li>
          <strong>Flexible units:</strong> Using <code>rem</code>,{" "}
          <code>em</code>, and viewport units for scalable typography
          <ul>
            <li>
              <code>rem</code> units scale relative to the root font size
            </li>
            <li>
              <code>em</code> units scale relative to the parent element
            </li>
            <li>
              <code>vw</code> and <code>vh</code> units scale with viewport
              dimensions
            </li>
          </ul>
        </li>
        <li>
          <strong>Media queries:</strong> Adjusting typography for different
          screen sizes and orientations
        </li>
        <li>
          <strong>CSS Grid and Flexbox:</strong> Creating responsive layouts
          that accommodate varying text lengths
        </li>
      </ul>

      <h3>Responsive Typography</h3>

      <p>
        Responsive typography adapts to different screen sizes and orientations,
        ensuring optimal readability across devices. This involves not just
        scaling font sizes but also adjusting line heights, letter spacing, and
        sometimes even switching typefaces for different viewport sizes.
      </p>

      <p>
        The concept of responsive typography extends beyond mere technical
        adjustments; it encompasses a holistic approach to ensuring content
        remains accessible and appealing regardless of how it's viewed. Consider
        these key principles when implementing responsive typography:
      </p>

      <ol>
        <li>
          <strong>Start with mobile:</strong> Design for the smallest screen
          first, then enhance for larger displays
          <ol>
            <li>Ensure minimum touch target sizes of 44×44 pixels</li>
            <li>Maintain adequate contrast ratios</li>
            <li>Test on actual devices, not just browser developer tools</li>
          </ol>
        </li>
        <li>
          <strong>Use fluid typography:</strong> Implement CSS{" "}
          <code>clamp()</code> function for smooth scaling
        </li>
        <li>
          <strong>Consider reading context:</strong> Adjust line length and
          spacing based on expected reading behavior
        </li>
      </ol>

      <h3>Accessibility Considerations</h3>

      <p>
        Typography plays a vital role in making content accessible to all users,
        including those with visual impairments or reading difficulties.
        Considerations such as adequate contrast, appropriate font sizes, and
        sufficient line spacing can significantly impact how easily content can
        be consumed by diverse audiences.
      </p>

      <dl>
        <dt>Contrast Ratio</dt>
        <dd>
          The measure of the difference in perceived brightness between two
          colors. <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>{" "}
          guidelines recommend a minimum contrast ratio of 4.5:1 for normal text
          and 3:1 for large text to ensure readability for users with visual
          impairments. You can test contrast ratios using tools like{" "}
          <code>axe-core</code> or online calculators.
        </dd>

        <dt>Line Length</dt>
        <dd>
          The width of a block of text, typically measured in characters per
          line (CPL). Optimal line length is generally considered to be between
          45-75 characters per line. Lines that are too long or too short can
          hinder readability and cause eye fatigue. The CSS property{" "}
          <code>max-width</code> with a value in <code>ch</code> units provides
          an elegant solution.
        </dd>

        <dt>Leading</dt>
        <dd>
          The vertical space between lines of text, controlled by the CSS{" "}
          <code>line-height</code> property. Proper leading improves readability
          by giving text room to breathe and helping the eye track from one line
          to the next. A line height of 1.4-1.6 times the font size is generally
          recommended for body text.
        </dd>

        <dt>Tracking</dt>
        <dd>
          The uniform spacing between characters in a block of text, adjusted
          using the CSS <code>letter-spacing</code> property. Proper tracking
          can improve readability, especially for all-caps text or at very small
          or large sizes.
        </dd>
      </dl>

      <p className="callout">
        The digital revolution of the late 20th century dramatically transformed
        typography, democratizing access to type design tools and expanding the
        possibilities for creative expression through type.
      </p>

      <small>
        Typography is not just about aesthetics; it's fundamentally about
        communication. The best typography serves its content faithfully,
        enhancing the reader's understanding and experience without calling
        undue attention to itself.
      </small>

      <h2>The Future of Typography</h2>

      <p>
        As technology continues to evolve, so too does the field of typography.
        Emerging trends and innovations are reshaping how we think about and
        interact with type. The most significant developments include:
      </p>

      <ol>
        <li>
          <strong>Variable Fonts:</strong> Revolutionary font technology that
          allows multiple variations within a single file
        </li>
        <li>
          <strong>Augmented and Virtual Reality:</strong> Typography in
          three-dimensional space presents new challenges
        </li>
        <li>
          <strong>Artificial Intelligence:</strong>{" "}
          <abbr title="Artificial Intelligence">AI</abbr>-powered font pairing
          and automated typographic optimization
        </li>
        <li>
          <strong>Environmental Typography:</strong> Digital signage and
          interactive displays in physical spaces
        </li>
      </ol>

      <p>
        Variable fonts represent one of the most significant recent advancements
        in typography. Unlike traditional font files that contain a single
        weight or style, variable fonts contain a range of variations along
        multiple axes, allowing for precise control over weight, width, slant,
        and other attributes within a single file. This technology not only
        reduces file sizes but also opens up new possibilities for responsive
        design and dynamic typography.
      </p>

      <p>
        Additionally, the rise of augmented reality (AR) and virtual reality
        (VR) is challenging designers to reconsider how typography functions in
        three-dimensional space. Text in these environments must be legible from
        multiple angles and distances, introducing novel considerations for
        typographic design.
      </p>

      <p className="callout">
        Modern web typography benefits from technologies like OpenType features,
        which enable advanced typographic capabilities such as ligatures,
        alternate characters, and contextual alternates directly in the browser
        using CSS properties like <code>font-feature-settings</code>.
      </p>

      <figure>
        <img
          src="https://images.unsplash.com/photo-1468779036391-52341f60b55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt="Typography samples with various fonts and styles"
        />
        <figcaption>
          Typography specimens showcasing different typefaces and their
          distinctive characteristics, demonstrating the evolution from metal
          type to digital fonts
        </figcaption>
      </figure>

      <h3>Type Classification Systems</h3>

      <p>
        Typography has evolved numerous classification systems to categorize and
        understand the vast array of typefaces. The following table outlines
        some major type classifications and their key characteristics:
      </p>

      <table>
        <thead>
          <tr>
            <th>Classification</th>
            <th>Key Characteristics</th>
            <th>Common Examples</th>
            <th>Typical Uses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Old Style Serif</td>
            <td>Diagonal stress, moderate contrast, bracketed serifs</td>
            <td>Garamond, Bembo, Palatino</td>
            <td>Body text, books, academic papers</td>
          </tr>
          <tr>
            <td>Transitional Serif</td>
            <td>Vertical stress, higher contrast, sharper serifs</td>
            <td>Baskerville, Times New Roman</td>
            <td>Newspapers, official documents</td>
          </tr>
          <tr>
            <td>Modern Serif</td>
            <td>Vertical stress, extreme contrast, thin serifs</td>
            <td>Bodoni, Didot</td>
            <td>Fashion, luxury branding</td>
          </tr>
          <tr>
            <td>Slab Serif</td>
            <td>Little to no contrast, heavy rectangular serifs</td>
            <td>Rockwell, Clarendon, Courier</td>
            <td>Headlines, displays, technical documents</td>
          </tr>
          <tr>
            <td>Humanist Sans</td>
            <td>Based on calligraphic forms, varying stroke widths</td>
            <td>Gill Sans, Frutiger, Myriad</td>
            <td>Signage, user interfaces</td>
          </tr>
          <tr>
            <td>Grotesque Sans</td>
            <td>Minimal contrast, closed apertures</td>
            <td>Helvetica, Univers, Franklin Gothic</td>
            <td>Corporate branding, wayfinding</td>
          </tr>
        </tbody>
      </table>

      <h3>Experimental Typography</h3>

      <p>
        Beyond practical applications, typography continues to evolve as an art
        form. Experimental typography pushes boundaries and challenges
        conventions, often prioritizing expression over traditional notions of
        readability. Modern techniques include:
      </p>

      <ul>
        <li>
          <strong>Kinetic Typography:</strong> Type in motion that adds temporal
          dimension
          <ul>
            <li>CSS animations and transitions</li>
            <li>
              JavaScript libraries like <code>GSAP</code> or{" "}
              <code>Framer Motion</code>
            </li>
            <li>WebGL-based text rendering for complex effects</li>
          </ul>
        </li>
        <li>
          <strong>Generative Typography:</strong> Algorithm-driven type creation
          <ul>
            <li>Data visualization through typographic forms</li>
            <li>Machine learning-generated letterforms</li>
            <li>
              Responsive text that adapts to user behavior or environmental data
            </li>
          </ul>
        </li>
        <li>
          <strong>Interactive Typography:</strong> Text that responds to user
          input
        </li>
      </ul>

      <p>
        When implementing experimental typography on the web, developers often
        use CSS custom properties (variables) to create dynamic, interactive
        experiences:
      </p>

      <pre>
        <code>{`:root {
  --font-weight: 400;
  --font-width: 100%;
  --letter-spacing: 0;
}

.dynamic-text {
  font-variation-settings: 
    'wght' var(--font-weight),
    'wdth' var(--font-width);
  letter-spacing: var(--letter-spacing);
  transition: all 0.3s ease;
}

.dynamic-text:hover {
  --font-weight: 700;
  --font-width: 125%;
  --letter-spacing: 0.05em;
}`}</code>
      </pre>

      <p>
        Similarly, generative typography uses algorithms and data to create
        dynamic, ever-changing typographic compositions. These systems can
        respond to user input, environmental factors, or other variables,
        resulting in unique, contextually relevant typographic expressions.
      </p>

      <h2>Typography in Practice</h2>

      <p>
        Implementing effective typography requires both theoretical
        understanding and practical skills. Here's a systematic approach to
        developing typographic systems:
      </p>

      <h3>Establishing a Type Scale</h3>

      <p>
        A modular scale creates consistent, harmonious relationships between
        different text sizes. Popular scales include:
      </p>

      <ol>
        <li>
          <strong>Perfect Fourth (1.333):</strong> Balanced and versatile for
          most applications
        </li>
        <li>
          <strong>Golden Ratio (1.618):</strong> Creates dramatic contrast,
          ideal for editorial design
        </li>
        <li>
          <strong>Major Third (1.25):</strong> Subtle progression, excellent for
          dense information
        </li>
      </ol>

      <h3>Performance Considerations</h3>

      <p>
        Typography significantly impacts web performance. Consider these
        optimization strategies:
      </p>

      <ul>
        <li>
          <strong>Font Loading:</strong> Use <code>font-display: swap</code> to
          prevent invisible text during font load
          <ul>
            <li>
              Implement proper fallback fonts that match x-height and character
              width
            </li>
            <li>
              Consider using <code>preload</code> hints for critical fonts
            </li>
            <li>
              Subset fonts to include only necessary characters and weights
            </li>
          </ul>
        </li>
        <li>
          <strong>Variable Fonts:</strong> Reduce HTTP requests by using single
          variable font files instead of multiple static fonts
        </li>
        <li>
          <strong>System Fonts:</strong> Leverage platform-native fonts for
          optimal performance:
          <code>
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
            system-ui, sans-serif
          </code>
        </li>
      </ul>

      <h2>Conclusion</h2>

      <p>
        Typography remains an essential component of visual communication,
        bridging art and information in a way few other design elements can.
        Whether in print or on screen, thoughtful typography enhances
        readability, establishes mood, reinforces brand identity, and guides
        users through content.
      </p>

      <p>
        As we continue to navigate an increasingly digital world, the importance
        of typography only grows. The principles that have guided typographic
        practice for centuries—readability, hierarchy, rhythm, and
        harmony—remain relevant even as the media through which we consume text
        evolves.
      </p>

      <p>
        By understanding and applying these principles, designers and developers
        can create typographic systems that not only look beautiful but also
        function effectively, serving the ultimate purpose of typography: to
        communicate clearly and meaningfully. Whether you're crafting a simple
        blog post or building a complex web application, remember that{" "}
        <q>typography is the voice of your content</q>—make sure it speaks
        clearly.
      </p>

      <hr />

      <h3>Additional Typographic Elements</h3>

      <p>
        Below are examples of additional HTML elements with their corresponding
        typographic treatments, demonstrating the full range of semantic markup
        available for rich text content:
      </p>

      <h4>Contact Information</h4>
      <address>
        Typography Foundation
        <br />
        123 Font Avenue
        <br />
        Letterpress City, CA 94103
        <br />
        <a href="mailto:typography@example.com">typography@example.com</a>
        <br />
        <a href="tel:+1-555-TYPE-123">+1 (555) TYPE-123</a>
      </address>

      <h4>Marked and Highlighted Text</h4>
      <p>
        The most important consideration in typography is{" "}
        <mark>readability and legibility</mark>, followed by aesthetic appeal.
        When discussing <dfn>kerning</dfn>—the spacing between individual letter
        pairs—it's crucial to understand how it differs from tracking.
      </p>

      <h4>Editorial Changes</h4>
      <p>
        The original sentence read, "
        <del dateTime="2024-01-15T10:30:00Z">
          Typography is just about choosing fonts
        </del>
        ." It was corrected to "
        <ins dateTime="2024-01-15T10:35:00Z">
          Typography is the art and technique of arranging type
        </ins>
        ."
      </p>

      <h4>Technical Terms and Abbreviations</h4>
      <p>
        <abbr title="American Institute of Graphic Arts">AIGA</abbr> and{" "}
        <abbr title="International Typographic Association">ITA</abbr> are
        prominent organizations in the field of typography and graphic design.
        Modern web standards like{" "}
        <abbr title="HyperText Markup Language">HTML</abbr>5 and{" "}
        <abbr title="Cascading Style Sheets">CSS</abbr>3 provide extensive
        typographic control.
      </p>

      <h4>Code and Technical Content</h4>
      <p>
        When working with web fonts, the <code>@font-face</code> rule allows you
        to define custom fonts. For example, you might use <kbd>Ctrl</kbd>+
        <kbd>Shift</kbd>+<kbd>I</kbd> to open developer tools and inspect the
        computed font properties.
      </p>

      <p>
        The <samp>font-family</samp> property output in the browser inspector
        might look like:{" "}
        <samp>"Helvetica Neue", Helvetica, Arial, sans-serif</samp>.
      </p>

      <h4>Mathematical and Scientific Notation</h4>
      <p>
        The golden ratio (φ ≈ 1.618) can be expressed as: φ = (1 + √5) / 2. In
        typography, you might see measurements like 16px × 1.618 = 25.89px for
        scaling text sizes. The formula for calculating line spacing often
        involves the relationship: leading = font-size × line-height, where
        optimal values typically range from 1.2 to 1.8.
      </p>

      <p>
        Chemical formulas in typography might appear as H<sub>2</sub>O or
        mathematical expressions like E = mc<sup>2</sup>. Proper vertical
        alignment of these elements is crucial for scientific and technical
        publications.
      </p>

      <h4>Quotations and Citations</h4>
      <p>
        As typographer Jan Tschichold once said,{" "}
        <q cite="https://example.com/tschichold-quotes">
          The good typographer is one who can arrange type so as to produce a
          graceful, orderly page that puts no strain on the eye.
        </q>{" "}
        This principle remains fundamental to modern digital typography.
      </p>

      <h4>Time and Data</h4>
      <p>
        Typography standards were established over centuries, with significant
        developments occurring on <time dateTime="1455">1455</time> (Gutenberg
        Bible), <time dateTime="1928">1928</time> (Tschichold's "New
        Typography"), and continuing into the digital age with the introduction
        of CSS in <time dateTime="1996-12-17">December 1996</time>.
      </p>

      <h4>References and Citations</h4>
      <ul>
        <li>
          <sup>1</sup> Bringhurst, Robert.{" "}
          <cite>The Elements of Typographic Style</cite>. Hartley & Marks
          Publishers, 2004.
        </li>
        <li>
          <sup>2</sup> Lupton, Ellen.{" "}
          <cite>
            Thinking with Type: A Critical Guide for Designers, Writers,
            Editors, & Students
          </cite>
          . Princeton Architectural Press, 2010.
        </li>
        <li>
          <sup>3</sup> Hochuli, Jost. <cite>Detail in Typography</cite>. Hyphen
          Press, 2008.
        </li>
        <li>
          <sup>4</sup> Tschichold, Jan. <cite>The New Typography</cite>.
          University of California Press, 1928 (English translation 1995).
        </li>
      </ul>

      <p>
        <small>
          Image credits: Typography specimens courtesy of various foundries and
          the public domain. Metal type photograph represents the rich history
          of typography that informs modern digital practices and continues to
          influence contemporary type design.
        </small>
      </p>
    </Typography>
  );
};

export default TypographyPage;

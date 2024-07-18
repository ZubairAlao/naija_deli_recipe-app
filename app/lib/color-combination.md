### Color Combination for Nigeria Recipe App

**1. Primary Colors:**
   - *Orange (#FFA500):* Symbolizing warmth, hospitality, and energy. It can be used for buttons to encourage interaction and call-to-action elements.
   - *Green (#008000):* Representing nature, freshness, and prosperity. It can be used for backgrounds or accents to reflect the abundance of natural ingredients in Nigerian cuisine.

**2. Accent Colors:**
   - *Red (#FF0000):* Adding a pop of color for highlighting important elements or alerts.
   - *Yellow (#FFFF00):* Symbolizing happiness and optimism. It can be used sparingly for highlighting text or icons.

**3. Neutrals:**
   - *White (#FFFFFF):* Providing a clean backdrop for content and ensuring readability.
   - *Brown (#964B00):* Representing earthiness and can be used for elements like borders or dividers to evoke the feeling of traditional Nigerian cooking.

**4. Additional Suggestions:**
   - For text, consider using a dark shade of brown or black for high contrast and readability.
   - Use shades of green for category labels or tags to create a visual connection with the ingredients used in Nigerian cuisine.
   - Consider incorporating patterns or motifs inspired by Nigerian textiles or cultural elements to add visual interest to backgrounds or cards.

*Example Usage:*
- **Button:** Orange (#FFA500) with white text for contrast.
- **Cards:** White background with brown (#964B00) borders or dividers, green (#008000) accents for category labels.
- **Text:** Black or dark brown for regular text, red (#FF0000) for important notifications or alerts.
- **Background:** Light green or off-white for the main background, with touches of orange (#FFA500) or brown (#964B00) for warmth.


# Font Size Guidelines for a Next.js App

When designing a Next.js app, selecting appropriate font sizes is crucial for ensuring readability and a good user experience. Here’s a general guideline for font sizes you can follow for different elements of your web app:

## General Font Sizes

1. **Navlinks**: 14-16px
   - Small enough to fit multiple links but large enough to be easily readable.

2. **Logo Name**: 20-24px
   - Should be prominent but not overpower the other elements.

3. **Headings**:
   - **h1**: 32-36px
     - Main page title or primary heading.
   - **h2**: 28-32px
     - Secondary headings.
   - **h3**: 24-28px
     - Tertiary headings.
   - **h4**: 20-24px
     - Smaller sections within a larger section.
   - **h5**: 16-20px
     - Even smaller sub-sections.
   - **h6**: 14-16px
     - The smallest heading, typically for minor sections.

4. **Subheadings**: 16-20px
   - Use for secondary text that complements headings.

5. **Body Text**: 16px
   - This is the standard size for paragraphs and most of the readable content on your site.

6. **Footer**: 12-14px
   - Smaller than the body text, as the footer usually contains less critical information.

## Additional Elements

- **Button Text**: 14-16px
  - Ensure the text is readable but fits well within the button design.

- **Form Labels**: 14-16px
  - Should be clear and readable.

- **Captions/Annotations**: 12-14px
  - For smaller, less critical text.

## Responsive Considerations

On smaller screens (e.g., mobile devices), you might want to adjust these sizes down by 10-20% to ensure they fit well and maintain a good visual hierarchy.

## Implementation in Next.js

Using styled-components or CSS modules is a common approach in Next.js for styling. Here’s an example using styled-components:

```jsx
// Example with styled-components
import styled from 'styled-components';

const NavLink = styled.a`
  font-size: 14px;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const LogoName = styled.h1`
  font-size: 24px;
  
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Heading1 = styled.h1`
  font-size: 32px;
  
  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const BodyText = styled.p`
  font-size: 16px;
  
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

// Usage in a component
export default function MyApp() {
  return (
    <div>
      <nav>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#about">About</NavLink>
      </nav>
      <LogoName>My App</LogoName>
      <Heading1>Main Heading</Heading1>
      <BodyText>This is some body text.</BodyText>
    </div>
  );
}




{/* <div className={`md:hidden flex flex-col absolute top-0 left-0 mt-[40px] w-full ${toggleDropdown ? "ease-in-out duration-500" : "ease-in-out duration-500 left-[-100%]"}`}> */}
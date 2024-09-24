# slack
Convex DB: https://dashboard.convex.dev/t/theanlim/slack-089a8
Run `npm run dev` to start the frontend
Run `npx convex dev` to start the backend

### Auth Screen
```jsx
<div className="h-full flex items-center justify-center bg-[#5C3B58]">
    <div className="md:h-auto md:w-[420px]">
        Auth Screen
    </div>
</div>
```
1. `h-full`: Sets the height of the div to 100% of its parent container.
1. `flex`: Applies CSS Flexbox to the div, allowing you to control layout and alignment.
1. `items-center`: Aligns items (in this case, the content inside the div) **vertically** in the center of the flex container.
1. `justify-center`: Aligns items **horizontally** in the center of the flex container.
1. `bg-[#5C3B58]`: Sets the background color of the div to a custom hex color #5C3B58
1. `md:h-auto`: On medium screens and larger (from 768px width and up), this sets the height of the div to auto, meaning it will adjust based on its content.
1. `md:w-[420px]`:On medium screens and larger (from 768px width and up), this sets the width of the div to 420 pixels.

### Sign In Card
```jsx
 <Card className="w-full h-full p-8">
    <CardHeader className="px-0 pt-0">
        <CardTitle/>
        <CardDescription/>
    </CardHeader>
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
        <TriangleAlert className="size-4" />
        <p>{error}</p>
    </div>
    <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
            <Input/>  // for email and pw
            <Button type="submit" className="w-full" size="lg" disabled={false}/>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
            <Button className="w-full relative">
                <FcGoogle className="size-5 absolute top-3 left-2.5" />
                Continue with Google
            </Button>
        </div>
        <p className="text-xs text-muted-foreground">
            Don&apos;t have an account? <span className="text-sky-700 hover:underline cursor-pointer">Sign up</span>
        </p>
    </CardContent>
</Card>
```
1. **`Card class="w-full h-full p-8"`**:
   - `w-full`: Sets the card width to take up the full available width of its container.
   - `h-full`: Sets the card height to take up the full available height of its container.
   - `p-8`: Adds padding (space inside the card) of 8 units (often 32px, depending on the tailwind config).

2. **`div class="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6"`**:
   - `bg-destructive/15`: Applies a background color with a 15% opacity. "destructive" is likely a custom color in the project's Tailwind configuration, and the /15 sets its transparency.
   - `p-3`: Applies padding of 3 units on all sides, which translates to 0.75rem (12px) of padding.
   - `rounded-md`: Adds medium rounding (md) to the corners of the element, making the corners slightly curved.
   - `flex`: Enables flexbox on the div to layout its children (TriangleAlert and the paragraph <p>{error}</p>) in a row.
   - `items-center`: Aligns the child elements along the center of the flex container vertically.
   - `gap-x-2`: Sets horizontal spacing of 2 units (0.5rem or 8px) between flex children.
   - `text-sm`: Sets the text size to small, which corresponds to 0.875rem (14px).
   - `text-destructive`: Applies the destructive color (most likely red or a warning color) to the text.
   - `mb-6`: Adds a margin of 6 units (1.5rem or 24px) to the bottom of the div to create spacing between the error message and the next element.

2. **`CardHeader class="px-0 pt-0"`**:
   - `px-0`: No horizontal padding (space on the left and right).
   - `pt-0`: No top padding (space above the header).

3. **`CardContent class="space-y-5 px-0 pb-0"`**:
   - `space-y-5`: Adds vertical spacing (usually 20px) between child elements.
   - `px-0`: No horizontal padding (left and right).
   - `pb-0`: No bottom padding.

4. **`form class="space-y-2.5"`**:
   - `space-y-2.5`: Adds vertical spacing of 2.5 units (often 10px) between child form elements.

5. **`Button class="w-full"`**:
   - `w-full`: The button takes up the full width of its container.

6. **`div class="flex flex-col gap-y-2.5"`**:
   - `flex`: Enables flexbox layout, aligning elements within the container in a flexible way.
   - `flex-col`: Flex items are arranged in a column.
   - `gap-y-2.5`: Adds vertical spacing (10px) between the items in the flexbox.

7. **`Button class="w-full relative"`**:
   - `w-full`: The button takes up the full width of its container.
   - `relative`: Allows absolute positioning of child elements within the button.

8. **`FcGoogle class="size-5 absolute top-3 left-2.5"`**:
   - `size-5`: Sets the size of the Google icon (often 20px).
   - `absolute`: Positions the icon absolutely relative to the parent button.
   - `top-3`: Positions the icon 3 units (12px) from the top of the button.
   - `left-2.5`: Positions the icon 2.5 units (10px) from the left of the button.

10. **`p class="text-xs text-muted-foreground"`**:
    - `text-xs`: Sets the font size to extra small.
    - `text-muted-foreground`: Applies a muted or grayish color to the text (often from a predefined color palette).

11. **`span class="text-sky-700 hover:underline cursor-pointer"`**:
    - `text-sky-700`: Applies a sky-blue color (700 is often a darker shade).
    - `hover:underline`: Underlines the text when the user hovers over it.
    - `cursor-pointer`: Changes the mouse cursor to a pointer when hovering over the element, indicating it is clickable.

### User Button
```jsx
<Loader className="size-4 animate-spin text-muted-foreground" />
```
- `size-4`: Likely sets the width and height of the loader to a size of 4 units (could refer to rem, px, or a design system unit).
- `animate-spin`: Applies a spinning animation to the loader.
- `text-muted-foreground`: Applies a muted or subdued color to the loader, typically from a predefined palette.

### Toolbar
```jsx
export const Toolbar = () => {
    return (
        <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
            <div className="flex-1" />
            <div className="min-w-[280px] max-[642px] grow-[2] shrink">
                <Button size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2">
                    <Search className="size-4 text-white mr-2" />
                    <span className="text-white text-xs"/>
                </Button>
            </div>
            <div className="ml-auto flex-1 flex items-center justify-end">
                <Button variant="transparent" size="iconSm">
                    <Info className="size-5 text-white"></Info>
                </Button>
            </div>
        </nav>
    );
}
```
#### 1. **`<nav>` tag**
   - **Class:** `bg-[#481349] flex items-center justify-between h-10 p-1.5`
     - `bg-[#481349]`: Sets the background color to a custom hex value `#481349`.
     - `flex`: Applies Flexbox layout, making the content inside flexibly adjust.
     - `items-center`: Aligns all the flex items to the center vertically.
     - `justify-between`: Spaces the items within the `nav` element evenly with space between them, but the first and last itemes are pushed to the ends of each side.
     - `h-10`: Sets the height of the toolbar to 2.5rem (10 units on the scale).
     - `p-1.5`: Adds padding of 0.375rem around the toolbar.

#### 2. **First `div` inside the `<nav>`**
   - **Class:** `flex-1`
     - `flex-1`: sets the `flex-grow` property to 1, allowing the flex item to grow to fill the available space. It also sets the `flex-shrink` property to 1, allowing the item to shrink if necessary. The `flex-basis` property is set to 0, meaning the starting size of the item before it grows or shrinks will be 0.

#### 3. **Second `div` inside the `<nav>`**
   - **Class:** `min-w-[280px] max-[642px] grow-[2] shrink`
     - `min-w-[280px]`: Sets the minimum width of this `div` to 280px.
     - `max-[642px]`: Ensures the maximum width is 642px.
     - `grow-[2]`: Increases the flex-grow property to 2, meaning this element will take twice as much space compared to other flex items.
     - `shrink`: Allows the element to shrink if necessary to fit within the container.

#### 4. **`Button` component inside the second `div`**
   - **Class:** `bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2`
     - `bg-accent/25`: Sets the background color with 25% opacity.
     - `hover:bg-accent-25`: Changes the background color when hovered.
     - `w-full`: Makes the button take up the full width of its container.
     - `justify-start`: Aligns the content inside the button to the start (left).
     - `h-7`: Sets the height of the button to 1.75rem.
     - `px-2`: Adds horizontal padding of 0.5rem (left and right).

#### 5. **`Search` component inside the `Button`**
   - **Class:** `size-4 text-white mr-2`
     - `size-4`: Custom size class that likely controls the icon size (based on utility classes in the codebase).
     - `text-white`: Sets the text (or icon) color to white.
     - `mr-2`: Adds a right margin of 0.5rem to space the search icon from the text.

#### 6. **`span` inside the `Button`**
   - **Class:** `text-white text-xs`
     - `text-white`: Sets the text color to white.
     - `text-xs`: Sets the font size to extra small (`xs`).

#### 7. **Third `div` inside the `<nav>`**
   - **Class:** `ml-auto flex-1 flex items-center justify-end`
     - `ml-auto`: Applies automatic left margin, pushing the `div` to the far right.
     - `flex-1`: Makes the element flexible and takes up remaining space.
     - `flex`: Makes the `div` a flex container.
     - `items-center`: Vertically centers items within the flex container.
     - `justify-end`: Aligns the content of this `div` to the right.

#### 8. **`Button` component inside the third `div`**
   - **Class:** `variant="transparent" size="iconSm"`
     - `variant="transparent"`: Applies a transparent background variant to the button.
     - `size="iconSm"`: Likely a custom size class for the button that makes it smaller, suitable for icons.

#### 9. **`Info` component inside the `Button`**
   - **Class:** `size-5 text-white`
     - `size-5`: Custom class for sizing the icon.
     - `text-white`: Sets the icon color to white.
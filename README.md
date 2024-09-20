# slack
Convex DB: https://dashboard.convex.dev/t/theanlim/slack-089a8
Run `npm run dev` to start the frontend
Run `npx convex dev` to start the backend

### Auth Screen
```
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
```
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
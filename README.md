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


### WorkspaceId Layout
```jsx
 <div className="flex h-[calc(100vh-40px)]">
    <Sidebar />
    {children}
</div>
```
#### 1. **Flex Container with Height Calculation**
   - **Class:** `flex h-[calc(100vh-40px)]`
     - `flex`: Applies a flexbox layout to the container, allowing its children (the `Sidebar` and `{children}` components) to be aligned and spaced using flex properties.
     - `h-[calc(100vh-40px)]`: Sets the height of the container to the full viewport height (`100vh`) minus `40px`. This is useful for creating a layout where the container takes up the entire height of the viewport while leaving space for any fixed elements, like a header.

### Sidebar
```jsx
<div className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
    <WorkspaceSwitcher />
    <SidebarButton icon={Home} label="Home" isActive={pathname.includes("/workspace")} />
    <SidebarButton icon={MessagesSquare} label="DMs" />
    <SidebarButton icon={Bell} label="Activity" />
    <SidebarButton icon={MoreHorizontal} label="More" />
    <div className="flex flexcol items-center justify-center gap-y-1 mt-auto">
        <UserButton />
    </div>
</div>

```
#### 1. **Sidebar Component**
   - **Outer `div`:**
     - **Class:** `w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4`
       - `w-[70px]`: Sets the width of the sidebar to `70px`.
       - `h-full`: Makes the sidebar take up the full height of its parent container.
       - `bg-[#481349]`: Applies a dark purple background color.
       - `flex`: Utilizes a flexbox layout.
       - `flex-col`: Arranges child elements in a column.
       - `gap-y-4`: Adds vertical spacing of `1rem` (16px) between child elements.
       - `items-center`: Centers child elements horizontally within the sidebar.
       - `pt-[9px]`: Applies a top padding of `9px`.
       - `pb-4`: Applies a bottom padding of `1rem` (16px).

   - **Child Components:**
     - **`WorkspaceSwitcher`:** A component likely used to switch between different workspaces.
     
     - **`SidebarButton` Components:**
       - Each `SidebarButton` receives an `icon`, `label`, and `isActive` prop.
       - **Classes for Buttons:**
         - Uses Tailwind CSS classes for consistent styling (not detailed in this snippet).

   - **User Button Section:**
     - **Outer `div`:**
       - **Class:** `flex flex-col items-center justify-center gap-y-1 mt-auto`
         - `flex`: Utilizes flexbox for layout.
         - `flex-col`: Arranges items in a column.
         - `items-center`: Centers items horizontally.
         - `justify-center`: Centers items vertically.
         - `gap-y-1`: Adds vertical spacing of `0.25rem` (4px) between items.
         - `mt-auto`: Applies automatic top margin, pushing this section to the bottom of the sidebar.

     - **`UserButton`:** A component that likely represents user-related functionality, such as profile settings or sign out.



### Sidebar Button
```jsx
export const SidebarButton = ({ icon: Icon, label, isActive }: SidebarButtonProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
            <Button
                variant="transparent"
                // cn conditionally renders tailwind classes without conflict
                className={cn(
                    "size-9 p-2 group-hover:bg-accent/20",
                    isActive && "bg-accent/20"
                )}
            >
                <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
            </Button>
            <span className="text-[11px] text-white group-hover:text-accent">
                {label}
            </span>
        </div>
    )
}
```
#### 1. **`SidebarButton` Component**
   - **Structure:**
     - **Outer `div`:** 
       - **Class:** `flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group`
         - `flex`: Applies flexbox layout.
         - `flex-col`: Arranges children in a column.
         - `items-center`: Centers children horizontally.
         - `justify-center`: Centers children vertically.
         - `gap-y-0.5`: Adds a vertical gap between children.
         - `cursor-pointer`: Changes the cursor to a pointer on hover.
         - `group`: Enables group hover states for nested elements.

     - **`Button`:**
       - **Variant:** `transparent`
       - **Class:** `cn("size-9 p-2 group-hover:bg-accent/20", isActive && "bg-accent/20")`
         - `size-9`: Custom class for button sizing.
         - `p-2`: Applies padding of `0.5rem`.
         - `group-hover:bg-accent/20`: Changes the background color on hover.
         - `isActive && "bg-accent/20"`: Conditionally applies background color if active.

     - **Icon Component:**
       - **Class:** `size-5 text-white group-hover:scale-110 transition-all`
         - `size-5`: Custom class for icon sizing.
         - `text-white`: Sets the icon color to white.
         - `group-hover:scale-110`: Scales the icon up slightly on hover.
         - `transition-all`: Enables smooth transitions for all properties.

     - **`span`:**
       - **Class:** `text-[11px] text-white group-hover:text-accent`
         - `text-[11px]`: Sets the font size to `11px`.
         - `text-white`: Sets the text color to white.
         - `group-hover:text-accent`: Changes the text color on hover.

### Workspace Switcher
```jsx
<DropdownMenu>
    <DropdownMenuTrigger>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
            {workspaceLoading ? (
                <Loader className="size-5 animate-spin shrink-0" />
            ) : (
                workspace?.name.charAt(0).toUpperCase()
            )}
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
            className="cursor-pointer flex-col justtify-start items-start capitalize"
        >
            {workspace?.name}
            <span className="text-sx text-muted-foreground">
                Active workspace
            </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
            <DropdownMenuItem
                key={(workspace._id)}
                className="cursor-pointer capitalize overflow-hidden"
            >
                <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                    {workspace.name.charAt(0).toUpperCase()}
                </div>
                <p className="truncate">{workspace.name}</p>
            </DropdownMenuItem>
        ))}
        <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => { setOpen(true) }}
        >
            <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                <Plus />
            </div>
            Create a new workspace
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
```
#### 1. **`WorkspaceSwitcher` Component**
   - **Structure:**
     - **`DropdownMenuTrigger`:**
       - **`Button`:**
         - **Class:** `size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl`
           - `size-9`: Custom class for button sizing.
           - `relative`: Sets the positioning context for absolutely positioned children.
           - `overflow-hidden`: Hides any overflow content.
           - `bg-[#ABABAD]`: Sets the background color to a grayish tone.
           - `hover:bg-[#ABABAD]/80`: Changes the background color to a slightly transparent version on hover.
           - `text-slate-800`: Sets the text color to a slate shade.
           - `font-semibold`: Applies a semi-bold font weight.
           - `text-xl`: Sets the font size to extra-large.

         - **Conditional Content:**
           - Displays a `Loader` icon if `workspaceLoading` is true; otherwise, it shows the first character of `workspace.name`, capitalized.

     - **`DropdownMenuContent`:**
       - **Props:** `side="bottom" align="start"`
         - Positions the dropdown content below the trigger and aligns it to the start (left).
       - **Class:** `w-64`
         - Sets the width of the dropdown to `16rem`.

     - **Dropdown Menu Items:**
       - **First Item (`DropdownMenuItem`):**
         - **Class:** `cursor-pointer flex-col justify-start items-start capitalize`
           - `cursor-pointer`: Changes the cursor to a pointer on hover.
           - `flex-col`: Arranges children in a column.
           - `justify-start`: Aligns children to the start of the column.
           - `items-start`: Aligns children to the start of the row.
           - `capitalize`: Capitalizes the text.
         - Displays `workspace.name` and a span with the text "Active workspace" styled with `text-sx text-muted-foreground`.

       - **Mapped Workspace Items:**
         - **`DropdownMenuItem`:**
           - **Key:** `workspace._id`
           - **Class:** `cursor-pointer capitalize overflow-hidden`
             - Similar cursor and capitalization as the first item.
           - **Content:**
             - **Icon Container:**
               - **Class:** `shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2`
                 - Sets dimensions, background color, text color, font size, and flex properties for the icon displaying the first character of the workspace name.
             - **Workspace Name:** Displays the full name of the workspace, truncated if too long.

       - **Last Item (`Create a New Workspace`):**
         - **Class:** `cursor-pointer`
           - Sets the cursor to a pointer.
         - **OnClick:** Triggers `setOpen(true)` when clicked.
         - **Icon Container:**
           - **Class:** `size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2`
             - Similar styling as the previous items but with a different background color (light gray).
           - Displays a `Plus` icon for creating a new workspace.

### Workspace Header
```jsx
<div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="transparent"
                className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
                size="sm"
            >
                <span className="truncate">{workspace.name}</span>
                <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem
                className="cursor-pointer capitalize"
            >
                <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                    {workspace.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col items-start">
                    <p className="font-bold">{workspace.name}</p>
                    <p className="text-sx text-muted-foreground">Active workspace</p>
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => { }}
            >
                Preferences
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <div className="flex items-center gap-0.5">
        <Hint label="Filter conversations" side="bottom">
            <Button variant="transparent" size="iconSm">
                <ListFilter className="size-4" />
            </Button>
        </Hint>
    </div>
</div>
```
#### 1. **`Container`**
   - **Structure:**
     - **`<div class="flex items-center justify-between px-4 h-[49px] gap-0.5">`:**
       - **`Display:`** Flexbox is used to align child elements in a horizontal row (`flex`).
       - **`Alignment:`** The items are vertically centered (`items-center`) and spaced horizontally to occupy the available space (`justify-between`).
       - **`Padding:`** Horizontal padding of `16px` (`px-4`).
       - **`Height:`** A fixed height of `49px` (`h-[49px]`).
       - **`Gap:`** Small gap between flex items (`gap-0.5`, `2px`).

#### 2. **`DropdownMenu`**
   - **Structure:**
     - **`<DropdownMenu>`**
       - Component for handling dropdown behavior.

#### 3. **`Button`**
   - **Structure:**
     - **`<Button variant="transparent" class="font-semibold text-lg w-auto p-1.5 overflow-hidden" size="sm">`:**
       - **`Variant:`** Transparent background (`variant="transparent"`).
       - **`Font Style:`** Bold font (`font-semibold`) with a size of `large` (`text-lg`).
       - **`Width:`** Automatic width based on content (`w-auto`).
       - **`Padding:`** Padding of `6px` (`p-1.5`).
       - **`Overflow:`** Hidden overflow to avoid content spill (`overflow-hidden`).

   - **`<span class="truncate">`:**
       - **`Text Overflow:`** Text inside the span is truncated with an ellipsis (`truncate`) if it overflows.
   
   - **`<ChevronDown class="size-4 ml-1 shrink-0">`:**
       - **`Size:`** A size of `16px` (`size-4`).
       - **`Margin Left:`** A small left margin of `4px` (`ml-1`).
       - **`Shrink:`** Prevents the icon from shrinking (`shrink-0`).

#### 4. **`DropdownMenuContent`**
   - **Structure:**
     - **`<DropdownMenuContent side="bottom" align="start" class="w-64">`:**
       - **`Positioning:`** Dropdown is aligned to the start and opens at the bottom (`side="bottom"`, `align="start"`).
       - **`Width:`** A fixed width of `256px` (`w-64`).

#### 5. **`DropdownMenuItem`**
   - **Structure:**
     - **`<DropdownMenuItem class="cursor-pointer capitalize">`:**
       - **`Cursor:`** Pointer cursor to indicate an interactive item (`cursor-pointer`).
       - **`Text Transform:`** Text is capitalized (`capitalize`).

     - **`<div class="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">`:**
       - **`Size:`** A fixed size of `36px` (`size-9`).
       - **`Background:`** A custom background color (`bg-[#616061]`).
       - **`Text Style:`** White text with bold font and size of `extra-large` (`text-white`, `font-semibold`, `text-xl`).
       - **`Layout:`** Flexbox layout centered vertically and horizontally (`flex`, `items-center`, `justify-center`).
       - **`Border Radius:`** A rounded appearance (`rounded-md`).
       - **`Margin Right:`** Margin of `8px` to the right (`mr-2`).

     - **`<div class="flex flex-col items-start">`:**
       - **`Layout:`** Flexbox layout with items stacked vertically (`flex-col`) and aligned to the start (`items-start`).
   
       - **`<p class="font-bold">`:**
         - **`Font Style:`** Bold font (`font-bold`).

       - **`<p class="text-sx text-muted-foreground">`:**
         - **`Font Size:`** Small text (`text-sx`).
         - **`Text Color:`** Muted foreground color (`text-muted-foreground`).

#### 6. **`Preferences DropdownMenuItem`**
   - **Structure:**
     - **`<DropdownMenuItem class="cursor-pointer py-2">`:**
       - **`Cursor:`** Pointer cursor for interactivity (`cursor-pointer`).
       - **`Padding:`** Vertical padding of `8px` (`py-2`).

#### 7. **`Right Section`**
   - **Structure:**
     - **`<div class="flex items-center gap-0.5">`:**
       - **`Display:`** Flexbox layout to align items in a row (`flex`).
       - **`Alignment:`** Items are centered vertically (`items-center`).
       - **`Gap:`** A small gap of `2px` between items (`gap-0.5`).

#### 8. **`Hint with Filter Button`**
   - **Structure:**
     - **`<Hint label="Filter conversations" side="bottom">`:**
       - Provides a tooltip-like hint that appears at the bottom (`side="bottom"`).

     - **`<Button variant="transparent" size="iconSm">`:**
       - **`Variant:`** Transparent button background (`variant="transparent"`).
       - **`Size:`** Small icon button (`size="iconSm"`).

     - **`<ListFilter class="size-4">`:**
       - **`Size:`** Icon with a size of `16px` (`size-4`).

### Workspace Sidebar
```jsx
<div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
    <Loader className="size-5 animate-spin text-white" />
</div>
```
#### 1. **`Container`**
   - **Structure:**
     - **`<div class="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">`:**
       - **`Display:`** Flexbox layout, with items stacked vertically (`flex-col`).
       - **`Background:`** A solid background color of `#5E2C5F` (`bg-[#5E2C5F]`).
       - **`Height:`** The container takes the full height of its parent (`h-full`).
       - **`Alignment:`**
         - **Horizontal:** Items are centered horizontally (`items-center`).
         - **Vertical:** Items are centered vertically within the container (`justify-center`).

#### 2. **`Loader`**
   - **Structure:**
     - **`<Loader class="size-5 animate-spin text-white">`:**
       - **`Size:`** A size of `20px` (`size-5`).
       - **`Animation:`** The loader spins continuously (`animate-spin`).
       - **`Color:`** The loader is white (`text-white`).

### Invite Modal
```jsx
<p className="text-4xl font-bold tracking-widest uppercase">
  {joinCode}
</p>
```
#### tracking-widest
- Purpose:
  - Increases the space between the letters of text, making the text appear more spread out. This is typically used to improve readability or create a specific design effect.
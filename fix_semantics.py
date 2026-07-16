import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace <main id="hero" with <div id="hero" and </main> with </div> for hero
content = content.replace('<main id="hero"', '<div id="hero"')
# We know </main> is at line 313.
content = content.replace('</main>\n\n      {/* Scroll Indicator */}', '</div>\n\n      {/* Scroll Indicator */}')

# Wrap the sections in <main>
# <nav> is around line 153.
# The first section starts at line 128.
# Actually, it's easier to just wrap the whole thing inside <div className="bg-brand-bg..."> with a <main> instead,
# EXCEPT the nav and footer.
# But <nav> is inside the first <section>.
# Let's extract <nav> ... </nav> and put it before the first <section>.
nav_match = re.search(r'(      {/\* Navigation \*/}\n      <nav.*?</nav>\n)', content, re.DOTALL)
if nav_match:
    nav_str = nav_match.group(1)
    content = content.replace(nav_str, '')
    
    # insert nav_str right after <div className="bg-brand-bg ...">
    content = content.replace(
        '    <div className="bg-brand-bg selection:bg-brand-violet selection:text-white text-brand-text overflow-x-hidden w-full relative">\n',
        '    <div className="bg-brand-bg selection:bg-brand-violet selection:text-white text-brand-text overflow-x-hidden w-full relative">\n' + nav_str + '      <main>\n'
    )
    
    # put </main> before <footer>
    content = content.replace(
        '      {/* Footer Section */}\n      <footer',
        '      </main>\n      {/* Footer Section */}\n      <footer'
    )

with open("src/App.tsx", "w") as f:
    f.write(content)

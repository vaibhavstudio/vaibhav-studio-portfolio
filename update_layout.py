import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# 1. Hero
content = content.replace(
    'className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"',
    'className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full px-2 sm:w-auto"'
)
content = content.replace(
    'className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-violet to-brand-cyan text-white uppercase tracking-widest text-sm font-medium overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg hover:shadow-[0_8px_24px_rgba(139,92,246,0.25)]"',
    'className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-violet to-brand-cyan text-white uppercase tracking-widest text-sm font-medium overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg hover:shadow-[0_8px_24px_rgba(139,92,246,0.25)]"'
)
content = content.replace(
    'className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-brand-card backdrop-blur-md border border-brand-muted/20 text-brand-text uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(34,211,238,0.15)] hover:bg-brand-card/80 hover:border-brand-cyan/50 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg "',
    'className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-brand-card backdrop-blur-md border border-brand-muted/20 text-brand-text uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(34,211,238,0.15)] hover:bg-brand-card/80 hover:border-brand-cyan/50 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg "'
)

# 2. About
content = content.replace(
    'className="w-full h-full object-cover aspect-[4/5] md:aspect-square lg:aspect-[4/5]"',
    'className="w-full object-cover aspect-[4/5] md:aspect-square lg:aspect-[4/5]"'
)

# 3. Services 
# ensure card heights equal, gap optimized
content = content.replace(
    'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"',
    'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"'
)

# 4. Featured Projects
# already flex-col on mobile, full width images. Let's make sure the buttons are full width on mobile.
content = content.replace(
    'className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-4 sm:py-3 bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:shadow-[0_4px_16px_rgba(139,92,246,0.25)] transition-all duration-300 group/btn active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg "',
    'className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-4 sm:py-3 bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:shadow-[0_4px_16px_rgba(139,92,246,0.25)] transition-all duration-300 group/btn active:scale-[0.98] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg "'
)
content = content.replace(
    'className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-4 sm:py-3 bg-white/5 text-brand-text text-xs uppercase tracking-widest font-medium rounded-sm hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(34,211,238,0.15)] hover:border-brand-cyan/50 hover:bg-white/10 transition-all duration-300 group/btn2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan active:scale-95"',
    'className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-4 sm:py-3 bg-white/5 text-brand-text text-xs uppercase tracking-widest font-medium rounded-sm border border-brand-muted/20 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(34,211,238,0.15)] hover:border-brand-cyan/50 hover:bg-white/10 transition-all duration-300 group/btn2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan active:scale-[0.98] active:translate-y-0"'
)

# 5. Process
content = content.replace(
    'className="group relative flex flex-col items-center gap-6 lg:gap-8 lg:flex-1"',
    'className="group relative flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 lg:flex-1"'
)

# 6. Testimonials
content = content.replace(
    'className="group relative flex flex-col p-8 sm:p-10 rounded-2xl bg-brand-card border border-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 overflow-hidden h-full"',
    'className="group relative flex flex-col p-6 sm:p-8 md:p-10 rounded-2xl bg-brand-card border border-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 overflow-hidden h-full"'
)

# 7. FAQ
content = content.replace(
    'className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-2xl"',
    'className="w-full text-left p-5 sm:p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-2xl"'
)
content = content.replace(
    'className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0"',
    'className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-0"'
)

with open("src/App.tsx", "w") as f:
    f.write(content)

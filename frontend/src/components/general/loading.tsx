const Loading = (() => {
    return (
        <a className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium" href="/docs/changelog">🎉 
            <div data-orientation="vertical" role="none" className="shrink-0 bg-border w-[1px] mx-2 h-4"></div> 
                <span className="sm:hidden">Loading</span>
                <span className="hidden sm:inline">Loading</span>
        </a>
    )
})

export default Loading;
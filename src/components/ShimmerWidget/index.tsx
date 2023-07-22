const ShimmerWidget = () => {
    let widgets = Array.from({length: 5}, (v, i) => i);
    return (
       <>
        { 
            widgets.map((widget, idx) => {
                return <div className="shimmer-widget" key={idx}></div>
            })
        }
       </>
    );
}

export default ShimmerWidget;

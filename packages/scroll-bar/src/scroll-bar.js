
export default{
	name:"UiScrollBar",
	componentName:"UiScrollBar",
    render(h){
    	return(
           <div class={['ui-scroll-bar']}>
             <ul class={['ui-scroll-bar-list']}>
                 {this.$slots.default}
             </ul>
           </div>
    		);
    }
}
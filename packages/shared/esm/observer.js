export class LayoutObserver {
    constructor(observer = () => { }) {
        this.connected = false;
        this.observe = (target) => {
            this.resizeObserver.observe(target);
            this.performanceObserver.observe({
                entryTypes: ['paint', 'element', 'layout-shift', 'event'],
            });
            this.mutationObserver.observe(target, {
                attributeFilter: ['style'],
                attributes: true,
            });
            this.connected = true;
        };
        this.disconnect = () => {
            if (this.connected) {
                this.resizeObserver.disconnect();
                this.performanceObserver.disconnect();
                this.mutationObserver.disconnect();
            }
            this.connected = false;
        };
        this.resizeObserver = new ResizeObserver(() => observer());
        this.performanceObserver = new PerformanceObserver(() => {
            observer();
        });
        this.mutationObserver = new MutationObserver(() => observer());
    }
}

import { createComponent, reactive, toRefs, onMounted, ref, watch } from "@vue/composition-api";
const math = require("mathjax");
import _ from "lodash";

export default createComponent({
    setup(props, ctx) {
        const s = reactive({
            fontFamilySelect: "",
            fontSizeSelect: "",
            formula: "\\frac{a}{1-aa^2}",
            editor: ref(null),
            currentTab: ref(1)
        });

        var head = document.getElementsByTagName("head")[0],
            script;
        script = document.createElement("script");
        script.type = "text/x-mathjax-config";
        script[window.opera ? "innerHTML" : "text"] =
            "MathJax.Hub.Config({\n" + "  tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']] }\n" + "});";
        head.appendChild(script);
        script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_CHTML";
        head.appendChild(script);

        const f = {
            reRender(formula: string) {
                if (window.MathJax) {
                    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "editor"], () => console.log("done"));
                }
            },
            init() {
                document.getElementById("editor")!.innerHTML = "$$" + s.formula + "$$";
                f.reRender(s.formula);
            },
            changeTab(n: number) {
                s.currentTab = n;
            }
        };

        onMounted(() => {
            f.init();
        });

        watch(
            () => s.formula,
            _.debounce((e: any) => {
                f.init();
            }, 300),
            { lazy: true }
        );

        const navItems = navigation();

        return { ...toRefs(s), ...f, navItems };
    }
});

function navigation() {
    return [
        { image1: "@/assets/svg/1.svg?data", image2: "margin-left:25px;", style: "@/assets/svg/2.svg" },
        { image1: "@/assets/svg/3.svg?data", image2: "margin-left:8px;", style: "@/assets/svg/4.svg" },
        { image1: "@/assets/svg/5.svg", image2: "margin-left:8px;", style: "@/assets/svg/5.svg" },
        { image1: "", image2: "", style: "" },
        { image1: "", image2: "", style: "" },
        { image1: "", image2: "", style: "" },
        { image1: "", image2: "", style: "" },
        { image1: "", image2: "", style: "" },
        { image1: "", image2: "", style: "" }
    ];
}

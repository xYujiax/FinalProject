<script>
    import { onMount} from 'svelte'
    
    import 'reveal.js/dist/reveal.css'
    import 'reveal.js/dist/theme/white.css'
    import 'reveal.js/plugin/highlight/monokai.css'

    import Presentation from './presentation.svelte'

    let deck;

    onMount(async () => {
        // executes lazy loading cuz there's no navigator on server side
        if (typeof window !== 'undefined') {
            const Reveal = await import('reveal.js');
            const Markdown = await import('reveal.js/plugin/markdown/markdown');
            const Highlight = await import('reveal.js/plugin/highlight/highlight');

            deck = new Reveal.default({
                autoAnimateEasing: 'ease',
                autoAnimateDuration: 1,
                hash: true,
                controls: true,
                progress: true,
            });
            deck.initialize({
                slideNumber:'c/t',
                plugins: [Markdown, Highlight]
                });

            //document.addEventListener('DOMContentLoaded', function() {
            const destroyButton = document.getElementById('nuke');
            if (destroyButton) {
                destroyButton.addEventListener('click', function() {
                    if (deck) {
                    deck.destroy();
                    }
                });
            }
            //});
        }
        
    })

</script>

<div class='reveal'>
    <div class='slides'>
        <Presentation />
    </div>
</div>


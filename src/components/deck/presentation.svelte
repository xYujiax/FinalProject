<script>
    import Slide from './slide.svelte' // imports slide template

    // stuff to trigger end of presentation
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function finishPresentation() {
        dispatch('presentation-finished');
    }

</script>

<Slide animate>
    <div>The Heck is CLT?</div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>sup</div>
</Slide>




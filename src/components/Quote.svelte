<script lang="ts">
    type Quote = {
        author: string;
        quote: string;
        created: string;
    }

    export let quote: Quote;
</script>

<div class="quote">
    <h1>{quote.quote}</h1>
    <cite>{quote.author}</cite>
</div>
<template>
    <section class="study-body">
        <add-artist />
        <mint-nft />
        <stamp-nft />
    </section>
</template>

<script>
export default {}
</script>

<style lang="scss">
.study-body {
    border: 1px solid var(--black);
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;

    button[type='submit'] {
        background: var(--black);
        padding: 10px 30px;
        color: var(--white);
        margin: 20px 0;
        border: 1px solid var(--black);
        transition: color 300ms ease, background 300ms ease;

        @include hover {
            color: var(--black);
            background: var(--white);
        }
    }
}
</style>

<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(107, 103, 103,0.5);
    .popup-inner {
        background-color: rgb(255, 255, 255);
        // margin: 100px;
        // padding-left: 200px;
        // padding-right: 200px;
        // padding-top: 50px;
        // padding-bottom: 50px;
    }
}
</style>
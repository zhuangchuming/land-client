<template>
  <div class="loading">
    <div class="imgWrap">
      <img src="../assets/imgs/common/loading.gif" alt="loading...">
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
	display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
	bottom: 0;
	justify-content: center;
    align-items: center;
    z-index: 1000;
    .imgWrap {
		width: 2.8rem;
		height: 2.8rem;
		display:flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.4rem;
		// box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		> img {
			width: 2.6rem;
			height: 2.6rem;
		}
    }
}
</style>

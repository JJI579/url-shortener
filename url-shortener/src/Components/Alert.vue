<script lang='ts' setup>
import useAlertStore from '@/stores/AlertStore';

const alertStore = useAlertStore();

</script>


<template>
	<div class="alert" :class="[
		{ 'alert--active': alertStore.isActive },
		alertStore.currentAlert?.type && `alert--${alertStore.currentAlert.type}`
	]">
		<div class="alert__content">
			<i class="pi pi-bell alert__icon"></i>
			<div class="alert__accent"></div>
			<span class="alert__text">
				{{ alertStore.currentAlert?.text }}
			</span>
			<i class="pi pi-times alert__close" @click.stop="alertStore.dismiss()"></i>
		</div>
	</div>
</template>


<style lang='scss' scoped>
.alert {
	position: fixed;
	right: -40%;
	top: 10%;
	z-index: 100000000;
	height: auto;
	min-width: 280px;
	max-width: 380px;
	gap: .75rem;
	line-height: 1.5em;

	padding: .75rem 1rem;
	border-radius: 14px;
	font-size: .9rem;
	font-weight: 500;
	letter-spacing: .2px;
	color: white;
	background: rgba(40, 40, 60, 0.85);
	backdrop-filter: blur(12px);
	box-shadow:
		0 10px 25px rgba(0, 0, 0, .35),
		inset 0 0 0 1px rgba(255, 255, 255, .08);
	transform: translateX(20px);
	opacity: 0;
	transition:
		right 0.35s cubic-bezier(.22, 1, .36, 1),
		transform 0.35s cubic-bezier(.22, 1, .36, 1),
		opacity 0.25s ease;
	display: flex;
	flex-direction: column;
	justify-content: left;
	gap: 1rem;

    &__content {
        display: flex;
        align-items: center;
    }

    &__icon {
        font-size: 1.25rem;
        opacity: .9;
    }

    &__text {
        flex: 1;
    }

    &__close {
        font-size: .9rem;
        opacity: .6;
        cursor: pointer;
        transition: 0.2s ease;
    }

    &--active {
        right: 2rem;
        transform: translateX(0);
        opacity: 1;
    }

    &--success {
        background: linear-gradient(180deg, #4ade80, #22c55e);
    }

    &--error {
        background: linear-gradient(180deg, #f87171, #ef4444);
    }

    &--warning {
        background: linear-gradient(180deg, #facc15, #eab308);
    }

    &--info {
        background: linear-gradient(180deg, #60a5fa, #3b82f6);
    }

    &__accent {
        width: 6px;
        height: 70%;
        border-radius: 6px;
        background: linear-gradient(180deg, #60a5fa, #3b82f6);
    }
}

</style>
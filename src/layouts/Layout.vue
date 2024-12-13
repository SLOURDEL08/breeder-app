<template>
  <div class="  border-secondary bg-primary">

    <div class="grid divide-x divide-secondary grid-cols-12 items-center">

      <div :class="`col-span-8 h-full`">
        <slot name="header-left" />
      </div>
      <div :class="`col-span-4 h-full`" >
        <slot name="header-right" />
      </div>
    </div>

    <div>
      <slot name="separator" />
    </div>

    <div class="grid grid-cols-12">
      <div :class="`col-span-${contentBeforeLeftColSpan} h-full`" v-if="contentBeforeLeftColSpan > 0">
        <slot name="content-beforeleft" />
      </div>
      <div :class="`col-span-${contentLeftColSpan} border-l border-secondary h-full`" v-if="contentLeftColSpan > 0">
        <slot name="content-left" />
      </div>
      <div :class="`col-span-${contentRightColSpan} border-secondary h-full`" v-if="contentRightColSpan > 0">
        <slot name="content-right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  props: {
    contentBeforeLeftColSpan: {
      type: Number,
      default: 2
    },
    contentLeftColSpan: {
      type: Number,
      default: 6
    },
    contentRightColSpan: {
      type: Number,
      default: 4
    },
  },
  computed: {
    isValidColSpan() {
      const total = this.contentBeforeLeftColSpan + this.contentLeftColSpan + this.contentRightColSpan;
      return total <= 12;
    }
  },
  watch: {
    isValidColSpan(newVal) {
      if (!newVal) {
        console.warn("La somme des 'col-span' dépasse 12. Veuillez ajuster les valeurs.");
      }
    }
  }
};
</script>

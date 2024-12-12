<template>
  <div class="min-h-screen ml-10 border-l border-secondary bg-primary">
    <!-- Section Header -->
    <div class="grid grid-cols-3 items-center">
      <div class="col-span-2 h-full">
        <slot name="header-left" />
      </div>
      <div class="col-span-1 h-full">
        <slot name="header-right" />
      </div>
    </div>

    <!-- Séparateur Infinite Scroll -->
    <div>
      <slot name="separator" />
    </div>

    <!-- Section Contenu Principal -->
    <div class="grid grid-cols-3 items-center">
      <div class="col-span-2 h-full">
        <slot name="content-left" />
      </div>
      <div class="col-span-1 h-full">
        <slot name="content-right" />
      </div>
    </div>
  </div>
</template>
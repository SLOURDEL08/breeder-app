<template>
  <div class=" ml-10 border-l border-secondary bg-primary">
    <div class="grid grid-cols-3 items-center">
      <div class="col-span-2 h-full">
        <slot name="header-left" />
      </div>
      <div class="col-span-1  border-l border-secondary  h-full">
        <slot name="header-right" />
      </div>
    </div>

    <div>
      <slot name="separator" />
    </div>

    <div class="grid grid-cols-3  divide-x divide-secondary  items-center">
      <div class="col-span-2  h-full">
        <slot name="content-left" />
      </div>
      <div class="col-span-1 border-secondary h-full">
        <slot name="content-right" />
      </div>
    </div>
  </div>
</template>
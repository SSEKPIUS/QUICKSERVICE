<template>
  <div class=" w-full p-2 h-full">
    <div class=" w-full p-5 shadow-xl">
      <BaseFilter
        section="Invoices"
        section-text="view Invoices"
      />
      <ContentInvoices />
    </div>
  </div>
</template>

<script>
import BaseFilter from '@/components/filters/BaseFilter'
import ContentInvoices from '@/components/common/invoicesUnfiltered/ContentInvoices'
export default {
  name: 'InvoicesUnfiltered',
  components: {
    ContentInvoices, BaseFilter
  }
}
</script>

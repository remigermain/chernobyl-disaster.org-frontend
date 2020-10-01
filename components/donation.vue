<template>
  <div class="modal flex justify-center items-center" @click.prevent="$emit('close')">
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform
          transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-center flex-wrap items-center gap-4">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="JKC2WU8HYUNVA" />
          <button type="submit"  class="flex flex-col items-center space-y-2 group">
            <div class=" h-16 w-16 flex justify-center items-center bg-blue-700 rounded-full shadow-sm group-hover:bg-blue-800">
              <svg-icon name="brand-paypal" class="group-hover:scale-110 transform transition-transform duration-300 text-white text-3xl" />
            </div>
            <span class="font-bold uppercase">Paypal</span>
            </button>
        </form>
        <a href="https://liberapay.com/rgermain/donate" class="flex flex-col items-center space-y-2 group">
          <div class=" h-16 w-16 flex justify-center items-center bg-yellow-500 rounded-full shadow-sm group-hover:bg-yellow-600">
            <svg-icon name="liberapay" class="group-hover:scale-110 transform transition-transform duration-300 text-white text-3xl" />
          </div>
          <span class="font-bold uppercase">liberapay</span>
        </a>
        <a href="https://www.buymeacoffee.com/rgermain" class="flex flex-col items-center space-y-2 group">
          <div class=" h-16 w-16 flex justify-center items-center bg-green-700 rounded-full shadow-sm group-hover:bg-green-600">
            <svg-icon name="mug" class="group-hover:scale-110 transform transition-transform duration-300 text-white text-3xl" />
          </div>
          <span class="font-bold uppercase">buy me a coffee</span>
        </a>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2
            bg-white text-base leading-6 font-medium text-gray-700 shadow-sm
            hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue
              transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click.prevent="$emit('close')"
          >
            {{ $t('utils.cancel') }}
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

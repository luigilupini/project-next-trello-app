'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalStore } from '@/store/ModalStore';
import useBoardStore from '@/store/BoardStore';
import TaskTypeRadioGroup from '@/components/TaskTypeRadioGroup';

export default function Model() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  const [addTodo, setAddTodo] = useBoardStore((state) => [
    state.addTodo,
    state.setAddTodo,
  ]);
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='form' className='relative z-10' onClose={closeModal}>
        {/* Use one Transition.Child to apply one transition to the backdrop... */}
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            {/* ...and another Transition.Child to apply a separate transition to the contents. */}
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left
                            align-middle shadow-xl transition-all'
              >
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900 pb-2'
                >
                  Add a Todo
                </Dialog.Title>
                <div className='mt-2'>
                  <input
                    type='text'
                    value={addTodo}
                    onChange={(e) => setAddTodo(e.target.value)}
                    className='w-full border border-gray-300 rounded-md outline-none p-5'
                    placeholder='Enter a task here...'
                  />
                </div>
                <TaskTypeRadioGroup />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
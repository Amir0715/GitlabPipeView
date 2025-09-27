<script>
    import { onMount, onDestroy } from "svelte";

    let { title, onclick, targetElement } = $props();
    let container;
    let createdElement = null;

    onMount(() => {
        // Создаем элементы через DOM API
        const wrapper = document.createElement('div');
        wrapper.className = 'sm:gl-w-auto gl-w-full';
        
        const button = document.createElement('a');
        button.className = 'gl-button btn btn-md btn-default gl-sm-w-auto gl-w-full';
        button.setAttribute('data-testid', 'new-subgroup-button');
        
        const span = document.createElement('span');
        span.className = 'gl-button-text';
        span.textContent = title;
        
        button.appendChild(span);
        wrapper.appendChild(button);
        
        // Добавляем обработчик
        button.addEventListener('click', onclick);
        
        // Вставляем в целевой элемент
        const target = document.querySelector(targetElement);
        if (target) {
            target.prepend(wrapper);
            createdElement = wrapper;
        }
    });

    onDestroy(() => {
        if (createdElement && createdElement.parentNode) {
            createdElement.parentNode.removeChild(createdElement);
        }
    });
</script>

<!-- Этот div нужен только для получения ссылки -->
<div bind:this={container} style="display: none;"></div>
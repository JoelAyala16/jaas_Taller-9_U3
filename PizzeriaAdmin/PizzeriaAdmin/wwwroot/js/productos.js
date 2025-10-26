function limpiarFormProducto() {
    document.getElementById("ProductoId").value = "";
    document.getElementById("Nombre").value = "";
    document.getElementById("Descripcion").value = "";
    document.getElementById("Precio").value = "";
    document.getElementById("Stock").value = "";
    document.getElementById("CategoriaId").value = "";
    document.getElementById("Activo").checked = true;
}

async function cargarCategoriasSelect(selectedId = null) {
    const resp = await fetch("/Categorias/ListForSelect");
    const cats = await resp.json();

    const sel = document.getElementById("CategoriaId");
    sel.innerHTML = `<option value="">-- Seleccione --</option>`;

    cats.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.nombre;
        if (selectedId && parseInt(selectedId) === c.id) {
            opt.selected = true;
        }
        sel.appendChild(opt);
    });
}

async function cargarTablaProductos() {
    const resp = await fetch("/Productos/ListJson");
    const data = await resp.json();

    const tbody = document.querySelector("#tablaProductos tbody");
    tbody.innerHTML = "";

    data.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.descripcion ?? ""}</td>
            <td>$ ${p.precio}</td>
            <td>${p.stock}</td>
            <td>${p.categoriaNombre ?? ""}</td>
            <td>${p.activo ? "Sí" : "No"}</td>
            <td>
                <button class="btn btn-sm btn-warning me-1 btn-edit-prod" data-id="\${p.id}">Editar</button>
                <button class="btn btn-sm btn-danger btn-del-prod" data-id="\${p.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById("btnNuevoProducto").addEventListener("click", async () => {
    limpiarFormProducto();
    document.getElementById("modalTitulo").innerText = "Nuevo Producto";
    document.getElementById("btnGuardarProducto").setAttribute("data-mode", "create");

    await cargarCategoriasSelect();

    const modal = new bootstrap.Modal(document.getElementById("productoModal"));
    modal.show();
});

document.querySelector("#tablaProductos tbody").addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-edit-prod")) {
        const id = e.target.getAttribute("data-id");

        const resp = await fetch(\`/Productos/GetProducto/\${id}\`);
        if (!resp.ok) {
            alert("No se pudo obtener el producto.");
            return;
        }

        const p = await resp.json();

        document.getElementById("ProductoId").value = p.id;
        document.getElementById("Nombre").value = p.nombre;
        document.getElementById("Descripcion").value = p.descripcion || "";
        document.getElementById("Precio").value = p.precio;
        document.getElementById("Stock").value = p.stock;
        document.getElementById("Activo").checked = p.activo;

        await cargarCategoriasSelect(p.categoriaId);

        document.getElementById("modalTitulo").innerText = "Editar Producto";
        document.getElementById("btnGuardarProducto").setAttribute("data-mode", "edit");

        const modal = new bootstrap.Modal(document.getElementById("productoModal"));
        modal.show();
    }
});

document.getElementById("btnGuardarProducto").addEventListener("click", async () => {
    const mode = document.getElementById("btnGuardarProducto").getAttribute("data-mode");

    const body = {
        id: document.getElementById("ProductoId").value || 0,
        nombre: document.getElementById("Nombre").value,
        descripcion: document.getElementById("Descripcion").value,
        precio: parseFloat(document.getElementById("Precio").value),
        stock: parseInt(document.getElementById("Stock").value),
        categoriaId: parseInt(document.getElementById("CategoriaId").value),
        activo: document.getElementById("Activo").checked
    };

    let url = "";
    let method = "";

    if (mode === "create") {
        url = "/Productos/CreateAjax";
        method = "POST";
    } else {
        url = \`/Productos/EditAjax/\${body.id}\`;
        method = "PUT";
    }

    const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const result = await resp.json();
    if (result.success) {
        bootstrap.Modal.getInstance(document.getElementById("productoModal")).hide();
        await cargarTablaProductos();
    } else {
        alert("Error al guardar el producto");
    }
});

document.querySelector("#tablaProductos tbody").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-del-prod")) {
        const id = e.target.getAttribute("data-id");
        document.getElementById("deleteProductoId").value = id;

        const modal = new bootstrap.Modal(document.getElementById("confirmDeleteProductoModal"));
        modal.show();
    }
});

document.getElementById("btnEliminarProductoConfirmado").addEventListener("click", async () => {
    const id = document.getElementById("deleteProductoId").value;

    const resp = await fetch(\`/Productos/DeleteAjax/\${id}\`, {
        method: "DELETE"
    });

    const result = await resp.json();
    if (result.success) {
        bootstrap.Modal.getInstance(document.getElementById("confirmDeleteProductoModal")).hide();
        await cargarTablaProductos();
    } else {
        alert("No se pudo eliminar el producto.");
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    await cargarTablaProductos();
});

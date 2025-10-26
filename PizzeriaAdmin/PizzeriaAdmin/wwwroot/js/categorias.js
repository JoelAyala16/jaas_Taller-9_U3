function limpiarFormCategoria() {
    document.getElementById("CategoriaId").value = "";
    document.getElementById("CatNombre").value = "";
    document.getElementById("CatActivo").checked = true;
}

async function cargarTablaCategorias() {
    const resp = await fetch("/Categorias/ListJson");
    const data = await resp.json();

    const tbody = document.querySelector("#tablaCategorias tbody");
    tbody.innerHTML = "";

    data.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.nombre}</td>
            <td>${c.activo ? "Sí" : "No"}</td>
            <td>
                <button class="btn btn-sm btn-warning me-1 btn-edit-cat" data-id="\${c.id}">Editar</button>
                <button class="btn btn-sm btn-danger btn-del-cat" data-id="\${c.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById("btnNuevaCategoria").addEventListener("click", () => {
    limpiarFormCategoria();
    document.getElementById("catModalTitulo").innerText = "Nueva Categoría";
    document.getElementById("btnGuardarCategoria").setAttribute("data-mode", "create");

    const modal = new bootstrap.Modal(document.getElementById("categoriaModal"));
    modal.show();
});

document.querySelector("#tablaCategorias tbody").addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-edit-cat")) {
        const id = e.target.getAttribute("data-id");

        const resp = await fetch(\`/Categorias/GetCategoria/\${id}\`);
        if (!resp.ok) {
            alert("No se pudo obtener la categoría.");
            return;
        }

        const cat = await resp.json();
        document.getElementById("CategoriaId").value = cat.id;
        document.getElementById("CatNombre").value = cat.nombre;
        document.getElementById("CatActivo").checked = cat.activo;

        document.getElementById("catModalTitulo").innerText = "Editar Categoría";
        document.getElementById("btnGuardarCategoria").setAttribute("data-mode", "edit");

        const modal = new bootstrap.Modal(document.getElementById("categoriaModal"));
        modal.show();
    }
});

document.getElementById("btnGuardarCategoria").addEventListener("click", async () => {
    const mode = document.getElementById("btnGuardarCategoria").getAttribute("data-mode");

    const body = {
        id: document.getElementById("CategoriaId").value || 0,
        nombre: document.getElementById("CatNombre").value,
        activo: document.getElementById("CatActivo").checked
    };

    let url = "";
    let method = "";

    if (mode === "create") {
        url = "/Categorias/CreateAjax";
        method = "POST";
    } else {
        url = \`/Categorias/EditAjax/\${body.id}\`;
        method = "PUT";
    }

    const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const result = await resp.json();
    if (result.success) {
        bootstrap.Modal.getInstance(document.getElementById("categoriaModal")).hide();
        await cargarTablaCategorias();
    } else {
        alert("Error al guardar la categoría");
    }
});

document.querySelector("#tablaCategorias tbody").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-del-cat")) {
        const id = e.target.getAttribute("data-id");
        document.getElementById("deleteCategoriaId").value = id;
        const modal = new bootstrap.Modal(document.getElementById("confirmDeleteCategoriaModal"));
        modal.show();
    }
});

document.getElementById("btnEliminarCategoriaConfirmado").addEventListener("click", async () => {
    const id = document.getElementById("deleteCategoriaId").value;

    const resp = await fetch(\`/Categorias/DeleteAjax/\${id}\`, {
        method: "DELETE"
    });

    const result = await resp.json();
    if (result.success) {
        bootstrap.Modal.getInstance(document.getElementById("confirmDeleteCategoriaModal")).hide();
        await cargarTablaCategorias();
    } else {
        alert("No se pudo eliminar la categoría.");
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    await cargarTablaCategorias();
});

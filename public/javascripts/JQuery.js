var animalsList = [{
    name: "Животные",
    childrenList: [
        {
            name: "Млекопитающие",
            childrenList: [
                "Коровы", "Ослы", "Собаки", "Тигры"
            ]
        },
        {
            name: "Другие",
            childrenList: [
                "Змеи", "Птицы", "Ящерицы"
            ]
        }
    ]
},
    {
        name: "Рыбы",
        childrenList: [
            {
                name: "Аквариумные",
                childrenList: [
                    "Гуппи", "Скалярии"
                ]
            },
            {
                name: "Морские",
                childrenList: [
                    "Морская форель"
                ]
            }
        ]
    }];

function genList(list, rootElem) {
    if (typeof list === "string") {

        $("<li>"+ list +"</li>").appendTo(rootElem);

    } else {
        for (let i = 0; i < list.length; ++i) {

            let child = list[i];

            if (typeof child !== "string") {

                let li = $("<li>"+ child.name +"</li>");
                let ul = $("<ul></ul>");
                genList(child.childrenList, ul);
                li.append(ul);
                rootElem.append(li);

            } else

                genList(child, rootElem);
        }
    }
}

function showAllChildren(elem) {

    console.log(elem);

    if (elem.hasChildNodes()) {
        for (i of elem.children) {

            showAllChildren(i);
        }
    }
}
$(document).ready(() => {

    var root = $("div.empty");
    var rootUl = $("<ul></ul>");
    root.append(rootUl);
    genList(animalsList, rootUl);

    $("li").click(function (e) {

        $(this).children().slideToggle("slow");
        e.stopPropagation();

    });

    showAllChildren(document.getElementsByClassName("empty")[0]);

});
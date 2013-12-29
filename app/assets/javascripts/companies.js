$(document).ready(function(){
	var ENTER_KEY = 13;
	company_id = $("#company-id").val();
	$(".type-box").keypress(function(event){
			if ((event.keyCode == ENTER_KEY)&&( $(".type-box").val() != "" )){
					task_with_category = $(".type-box").val();
					task = task_with_category.split("@")[0];
					category  = task_with_category.split("@")[1];
					category = (category == undefined )? "general" : category;
					window.category = category;
					window.task = task;
					$(".type-box").val("");
					$.post("/companies/"+company_id+"/categories/",{name: category,company_id: company_id}, function(data){
						console.log(data);
						if(data.status == "Already exists"){
							addTodoToTable(data.category.id);
						}
						else{
							addCategoryToDOM();
							addTodoToTable(data.category.id);		
						}
					});
			}
	});
	function addTodoToTable(category_id){
		$.post("/companies/"+company_id+"/categories/"+category_id+"/todos/",{name: window.task,category_id: category_id,status: true},function(data){
			if(data.status == "success"){
				addTodoToDOM(data.todo);
			}
		});
	}
	function addCategoryToDOM(){
		$(".todos").append("<div class='"+window.category+" category col-xs-4'><center><h3>"+window.category+"</h3></center><table class='table' id='"+window.category+"'></table></div>");
	}
	function addTodoToDOM(todo){
		console.log(getHTML(todo));
		$("#"+window.category).append(getHTML(todo));
		$(".del").on("click",function(event){
		todo_id = $(this).parent().attr('id').split("-")[1];
		category_id = $(this).closest("table").attr("data-category-id")
		$.ajax("/companies/"+company_id+"/categories/"+category_id+"/todos/"+todo_id+"/remove",{
			type: 'get',
			data: {id: todo_id},
			dataType: 'json',
  		success: function( resp ) {
    	if(resp.status == "success"){
    		removeTodoFromDOM(resp.todo);
    	}
  		}
		});
		});
	}

	$(".check").on("click",function(event){
		todo_id = $(this).parent().attr('id').split("-")[1];
		category_id = $(this).closest("table").attr("data-category-id")
		$.ajax("/companies/"+company_id+"/categories/"+category_id+"/todos/"+todo_id+"/change_status",{
			type: 'get',
			data: {id: todo_id},
			dataType: 'json',
  		success: function( resp ) {
    	if(resp.status == "success"){
    		markAsCompleted(resp.todo);
    	}
  		}
		});
		});
	function markAsCompleted(todo){
		if(todo.status == false )
			$($("#t-"+todo.id).children()[1]).removeClass("line");
		else
			$($("#t-"+todo.id).children()[1]).addClass("line");
	}
	function removeTodoFromDOM(todo){
		$("#t-"+todo.id).closest("tr").fadeOut().remove();
	}
	function forEach(data,func){
  	for(d in data)
    	func(data[d],d);
	}
	function tag(name, content, attributes) {
	  return {name: name, attributes: attributes, content: content};
	}
	function td(content){
	  return tag("td",content,{});
	}
	function tr(content,id,clas){
	  return tag("tr",content,{id:id,class:clas});
	}
	function renderHTML(element){
	  var pieces = [];
	  function renderAttributes(attributes) {
	    var result = [];
	    if (attributes) {
	      for (var name in attributes) 
	        result.push(" " + name + "=\"" +
	                    attributes[name] + "\"");
	    }
	    return result.join("");
	  }
	  function render(element) {
	    if (typeof element == "string") {
	      pieces.push(element);
	    }
	    else if (!element.content || element.content.length == 0) {
	      pieces.push("<" + element.name +
	                  renderAttributes(element.attributes) + "/>");
	    }
	    else {
	      pieces.push("<" + element.name +
	                  renderAttributes(element.attributes) + ">");
	      forEach(element.content, render);
	      pieces.push("</" + element.name + ">");
	    }
	  }
	  render(element);
	  return pieces.join("");
	}
	function getHTML(todo){
	  var res = [];
	  var checkboxAttr = {type:"checkbox",class:"check"};
	  id = "t-"+todo.id;
	  console.log(id);
	  var divAttr = {id: id ,class:"ui-state-default todo"}; 
	  if(!todo.status){
	    checkboxAttr["checked"]="checked";
	    divAttr.class+=" success";
	  }
	  res[0] = renderHTML(tag("input",null,checkboxAttr));
	  res[1] = renderHTML(tag("span",todo.name ,{class:"text"}));
	  res[3] = renderHTML(tag("span","x",{class:"del"}));
	  return renderHTML(tag("tr",renderHTML(tag("td",renderHTML(tag("div",res.join(" "),divAttr)),null)),null));
	}
	$(".del").on("click",function(event){
		todo_id = $(this).parent().attr('id').split("-")[1];
		category_id = $(this).closest("table").attr("data-category-id")
		$.ajax("/companies/"+company_id+"/categories/"+category_id+"/todos/"+todo_id+"/remove",{
			type: 'get',
			data: {id: todo_id},
			dataType: 'json',
  		success: function( resp ) {
    	if(resp.status == "success"){
    		removeTodoFromDOM(resp.todo);
    	}
  		}
		});
	});
});
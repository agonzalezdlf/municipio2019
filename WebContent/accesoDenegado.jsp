<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
<title>Acceso denegado</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
<link rel="stylesheet" href="include/css/estilosam.css" type="text/css">
<link rel="stylesheet" href="/include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="include/css/bootstrap-3.3.7.css" type="text/css">
<style type="text/css">
	.alert-danger {
	  color: #a94442;
	  background-color: #f2dede;
	  border-color: #ebccd1;
	  font-style: italic;
	  text-align: center;
	}
	.alert-danger hr {
  		border-top-color: #e4b9c0;
	}
	.alert-danger .alert-link {
  		color: #843534;
	}
	.info-container{
   		display: inline-block;
    	width: calc(100% + -50px);
    	vertical-align:middle;
 	}
 	.btn-link {
  font-weight: normal;
  color: #337ab7;
  border-radius: 0;
}
.btn-link,
.btn-link:active,
.btn-link.active,
.btn-link[disabled],
fieldset[disabled] .btn-link {
  background-color: transparent;
  -webkit-box-shadow: none;
          box-shadow: none;
}
.btn-link,
.btn-link:hover,
.btn-link:focus,
.btn-link:active {
  border-color: transparent;
}
.btn-link:hover,
.btn-link:focus {
  color: #23527c;
  text-decoration: underline;
  background-color: transparent;
}
.btn-link[disabled]:hover,
fieldset[disabled] .btn-link:hover,
.btn-link[disabled]:focus,
fieldset[disabled] .btn-link:focus {
  color: #777;
  text-decoration: none;
}
</style>
<body>
		<br>
		<br>
		<div class="alert alert-danger">
  			<div class="row col-md-offset-1">
	          <h1 style="font-size: 40px; padding:0px 10px 0px 0px;margin: auto;" class="h1-encabezado">Acceso denegado</h1><br>
	          <h2 class="info-container">${msg}</h2>
			</div> 
			<div>
				<a href="<c:url value='/index.html'/>" >
      				<button type="button" class="btn btn-link"><span style="font-size:14px; font-weight:bold">Autentificarse</span></button>
   				</a>  
				
			</div>
			
		</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html">
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
<title>Listado de Personas</title>

<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorUsuariosRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>  
<script type="text/javascript" src="../../dwr/util.js"> </script> 
<script type="text/javascript" src="lst_usuarios.js?x=<%=System.currentTimeMillis()%>"></script>
<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css">
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>
</head>

<body>
<form name="forma" id="forma" method="post" action="" onSubmit=" return false" >

<input type="hidden" name="clave" id="clave" value="" />
<input type="hidden" name="idUsuario" id="idUsuario"  value=""/>
<input type="hidden" name="idTrabajador" id="idTrabajador"  value=""/>
<br />
 
	<div class="row">
		<h1 style="text-align: center;"> Configuración - Lista de usuarios</h1>
	</div>  
 	
 		<div class="form-group">
 			
 				<div class="col-md-3 col-md-offset-4">
	              		<input  name="cmdnewuser" type="button" class="btn btn-info" id="cmdnewuser"   value="Nueva persona" style="width:180px" />
	              	</div>
 			
	 		 <div class="col-md-offset-8 col-md-2">
	 		 	<input class="form-control" id="txtPersona" name="txtPersona" type="text" placeholder="Search..">
	 		 </div>
	 		 <br>
 		</div>
 	
	
  <div class="container-fluid">		
  <table style="width:100%; border:0; text-align:center; border-spacing: 15px " class="table table-hover table table-condensed"  >
    <thead class="thead-inverse">
      <tr>
      	<th width="4%"><input type="checkbox" name="todos" id="todos"/></th>
        <th>CLAVE</th>
        <th>NOMBRE</th>
        <th>APELLIDO PATERNO</th>
        <th>APELLIDO MATERNO</th>
        <th>DEPENDENCIA</th>
        <th>ESTATUS</th>
         <th>&nbsp</th>
      </tr>
    </thead>
    <tbody id="TbPersona">
       <c:set var="cont" value="${0}" /> 
       <c:forEach items="${personas}" var="item" varStatus="status" >
       		 
       		 <tr <c:out value="${cont}"/> >
       		 	<td style="width:4%;align:center"><input alt="<c:out value='${item.CV_PERS}'/>" type="checkbox" id="chkpers" name="chkpers" />
            	<td align="center"><c:out value="${item.CVE_PERS}"/></td>
            	<td align="center"><c:out value="${item.NOMBRE}"/></td>
            	<td align="center"><c:out value="${item.APE_PAT}"/></td>
            	<td align="center"><c:out value="${item.APE_MAT}"/></td>
            	<td align="center"><c:out value="${item.DEPENDENCIA}"/></td>
            	<td align="center"><c:out value="${item.ACTIVO}"/></td>
            	<td align="center"><img src="../../imagenes/page_white_edit.png" style="cursor: pointer;" alt="Editar registro" width="18" height="18" border="0" onClick='modificarDatos(<c:out value="${item.CVE_PERS}"/>)' ></td>
            	<c:set var="cont" value="${cont+1}"/>
       		 </tr>
       </c:forEach>
    </tbody>
  </table>
  </div>
  
  
</form>
</body>
</html>
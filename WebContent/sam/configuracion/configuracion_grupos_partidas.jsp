<%@ page contentType="text/html;charset=UTF-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Configuración de Firmas</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>

<link rel="stylesheet" href="../../include/js/bootstrap-3.3.7/css/bootstrap-3.3.7.min.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css">
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7/js/bootstrap-3.3.7.min.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorGruposPartidasRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>
<script type='text/javascript' src='../../dwr/util.js'></script>
<script type="text/javascript" src="../../include/js/toolsamV20.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="configuracion_grupos_partidas.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>


<body >
<form  class="form-horizontal" name="forma" method="get" action="" onSubmit=" return false" >
<br/>
  <div style="width:1200px; margin-left:auto; margin-right:auto" class="container">
  	
    <div class="row col-md-offset-2">
          <h1 class="h1-encabezado">Configuración - Grupos de partidas</h1>
    </div>  
    <div class="well">
    <div class="form-group">
	    <label for="capitulo" class="col-md-2 control-label">Partida:</label>
        <div class="col-md-5">
        	<select name="capitulo" size="1" class="comboBox form-control small" id="capitulo" onChange="pintarTablaDetalles()" style="width:445px;">
          <option value="">[Seleccione]</option>
          <c:forEach items="${capitulo}" var="item" varStatus="status">
              <option value="<c:out value='${item.CLV_CAPITU}'/>">
                <c:out value='${item.CLV_CAPITU}'/>-<c:out value="${item.CAPITULO}"/>
                </option>
            </c:forEach>
       	 </select>
        </div>
    </div>
    <div class="form-group">
	    <label for="grupo" class="col-md-2 control-label">Grupo:</label>
    	<div class="col-md-5">
        	<select name="grupo" size="1" class="form-control small" id="grupo" onChange="pintarTablaDetalles()" style="width:445px;">
          <option value="">[Seleccione]</option>
          <c:forEach items="${grupos}" var="item" varStatus="status">
              <option value="<c:out value='${item.ID_GRUPO_CONFIG}'/>" >
                <c:out value="${item.GRUPO_CONFIG}"/>
                </option>
            </c:forEach>
	        </select>
	    </div>
        <div class="col-md-2">
        	<input type="button"  class="btn btn-asignar" id="cboasignar"  name="cboasignar" value="Asignar grupo de proyectos"   style=""/>
        </div>
    </div>
    <div class="form-group">
    	<div class="col-md-2 col-md-offset-2">
    	<input type="button"  class="btn btn-success"  name="btnGrabar" id="btnGrabar" value="Guardar"  style="width:100px"/>
        </div>
    </div>
   </div>
   
<table class="table table-hover table table-condensed" cellpadding="0" cellspacing="0" id="detallesTabla" >
      <thead>
        <tr>
          <th width="3%" height="10" style="text-align: center;" class="col-sm-1"><input type="checkbox" name="todos" id="todos" ></th>
          <th width="24%"  align="center" class="col-sm-2">Partida</th>
          <th width="40%" class="col-sm-5" style="text-align: left;">Descripción</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
 </table>
<br />
</div>
</form>
</body>
</html>

<%@ page contentType="text/html;charset=UTF-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Configuración de Firmas</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
<!--<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">-->
<link rel="stylesheet" href="../../include/css/bootstrap.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>	
<link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">

<script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>
<script type="text/javascript" src="../../include/js/componentes/componentes.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorGruposProyectosRemoto.js"> </script>

<script type="text/javascript" src="../../dwr/engine.js"> </script>  
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<script type="text/javascript" src="configuracion_grupos_proyectos.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/presupuesto/presupuesto.js"></script>
<script type="text/javascript" src="../../include/js/otros/productos.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>

<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>

<link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen">

<body >
<form class="form-horizontal" role="form" name="forma" method="get" action="" onSubmit=" return false" >
<br/>
  <div style="width:1200px; margin-left:auto; margin-right:auto" class="container"> 
  
        <div class="row col-md-offset-2">
          <h1 class="h1-encabezado"> Configuración - Grupos de proyectos</h1>
        </div>  
       
        <div class="well">
        <div class="form-group">
          <label for="unidad" class="col-md-2 control-label">Unidad:</label>
          <div class="col-md-5">
            <select name="unidad" size="1" class="comboBox form-control small"  id="unidad" onChange="pintarTablaDetalles()"  style="width:445px;">
              <option value="">[Seleccione]</option>
              <c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">
              <option value="<c:out value='${item.ID}'/>">
                <c:out value="${item.DEPENDENCIA}"/>
                </option>
              </c:forEach>
            </select>
          </div>
        </div> 
        <div class="form-group">
           <label for="grupo" class="col-md-2 control-label">Grupo:</label>
           <div class="col-md-5">
               <select name="grupo" size="1" class="comboBox form-control" id="grupo" onChange="pintarTablaDetalles()" style="width:445px;">
                <option value="">[Seleccione]</option>
                  <c:forEach items="${grupos}" var="item" varStatus="status">
                <option value="<c:out value='${item.ID_GRUPO_CONFIG}'/>" >
                <c:out value="${item.GRUPO_CONFIG}"/>
              </option>
                  </c:forEach>
              </select>
              <input type="hidden" name="clave" id="clave" />
           </div>
        </div>
         <div class="form-group">
          <div class="col-md-2 col-md-offset-2">
             <input type="button"  class="btn btn-success btn-sm" name="btnGrabar" value="Guardar"  onClick="guardarProyectosGrupos()" style="width:100px"/>
          </div>
    </div>  
     </div>
       
    <table class="table table-hover table table-condensed" cellpadding="0" cellspacing="0" id="detallesTabla" >
      <thead>
        <tr>
          <th width="3%" height="10" class="col-sm-1"><input type="checkbox" name="todos" id="todos" ></th>
          <th width="24%"  align="center" class="col-sm-2">Proyecto</th>
          <th width="40%" class="col-sm-5" style="text-align: left;">Descripción</th>
          <th width="28%" class="col-sm-4" style="text-align: left;">Unidad Administrativa</th>
        </tr>
      </thead>
      <tbody>
       <%-- inicia el contador de lineas en 0 --%>  
              <c:set var="cont" value="${0}" /> 
            <c:forEach items="${roles}" var="item" varStatus="status" >
                <%-- pinta la primer linea--%>  
              <tr id='f<c:out value="${cont}"/>' onMouseOver="color_over('f<c:out value="${cont}"/>')" onMouseOut="color_out('f<c:out value="${cont}"/>')">
                <td align="center"><input type="checkbox" name="claves" id='claves' value="<c:out value='${item.ID_PROYECTO_GRUPO}'/>" ></td>
                <td align="left"><c:out value="${item.ID_GRUPO_CONFIG}"/></td>
                <td align="center"><c:out value="${item.PROYECTO}"/></td>
                    <td align="center"><c:out value="${item.ID_PROYECTO}"/></td>
                <td align="center"><img src="../../imagenes/page_white_edit.png" style="cursor: pointer;" alt="Editar registro" width="18" height="18" border="0" onClick='modificarDatos(<c:out value="${item.ID_PROYECTO_GRUPO}"/>)' ></td>
             </tr>
                 <%-- Incrementa el contador--%>
              <c:set var="cont" value="${cont+1}"/>
          </c:forEach>
        </tbody>
    </table>  
  </div>
  
</form>
</body>
</html>

<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Reembolso de Vales Finanzas</title>


<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>

<script type="text/javascript" src="../../include/js/jquery-1.3.2.min.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorReembolsosLiquidosValesRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>  
<script type="text/javascript" src="../../dwr/util.js"> </script>  
<script type="text/javascript" src="reembolsos.js?x=<%=System.currentTimeMillis()%>"></script>
<!-- 
	<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css"/>
	<link rel="stylesheet" href="../../include/css/sweetalert2.min.css" type="text/css"/>
	<link href="../../include/js/autocomplete/jquery.autocomplete.css" rel="stylesheet" type="text/css" />
	<link type="text/css" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" rel="stylesheet" />	
	<link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css"/>
 -->


<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">

<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js"></script>
<script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>

<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>

<script type="text/javascript" src="../../include/js/toolSam.js"></script>
<script type="text/javascript" src="../../include/js/jquery.maxlength.js"></script>
<script type="text/javascript" src="../../include/js/jquery.bestupper.min.js"></script>
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
<link rel="stylesheet" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" type="text/css" />
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />
<link rel="stylesheet" href="../../include/css/sweetalert2.min.css" type="text/css"/>

<script type="text/javascript" src="../../include/js/sweetalert2.min.js"></script>
<link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen"/>

</head>
<body>
<div class="row col-md-offset-1">
	<h1 class="h1-encabezado">Vales - Captura de Reembolso Liquido</h1>
</div> 
<form name="forma" action="" method="POST">
<div class="well">
	<input type="hidden" name="importeAnte" id="importeAnte" />
    <input type="hidden" name="cve_proyecto" id="cve_proyecto" />
    <input type="hidden" name="cve_partida" id="cve_partida" />
    <input type="hidden" name="cve_val"  id="cve_val"value=''>
	<!-- Unidad administrativa-->
	<div class=row>
		<div class="form-group">
		<div class="control-label col-sm-3 control-label">Unidad administrativa:</div>
		<div class="form-group col-md-4">	
		    <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
      			<c:out value="${nombreUnidad}"/><input type="hidden" name="cbUnidad" id="cbUnidad" value='<c:out value="${idUnidad}"/>' />
      		</sec:authorize>
       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
       			<select name="cbUnidad" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbUnidad">
            		<option value="0">[Seleccione]</option>
            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
              			<option value="<c:out value="${item.ID}"/>" 
              			<c:if test="${item.ID==idUnidad}"> selected </c:if> >
             			<c:out value="${item.DEPENDENCIA}"/></option>
           			</c:forEach>
          		</select>
        	</sec:authorize>
        </div>
     </div>
	</div>
	<!-- Tipo de Gasto-->
	<div class="row">
    	<div class="form-group">
           <div class="control-label col-sm-3 ">*Fecha de reembolso:</div>
           <div class="form-group col-sm-3">
               <input name="fecha" type="text" class="input" id="fecha" style="width:100px"  value='<c:out value="${fechaActual}"/>'  maxlength="15" readonly="readonly">
           </div>
        </div>
   </div>
   <!--Fecha Reembolso-->
   <div class="row">
     <div class="form-group">
         <div class="control-label col-sm-3 ">*Fecha de reembolso:</div>
         <div class="form-group col-sm-3">
           <div class="input-group date">
               <input name="fecha" type="text" class="form-control" id="fecha" value="" style="width:100%" maxlength="10"/>
               <span class="input-group-addon">
                 <span class="glyphicon glyphicon-calendar"></span>
               </span>
           </div>
           <input name="fecha2" type="hidden" class="input" id="fecha2" value=<%=new java.util.Date()%> style="width:111px" maxlength="10"/>
         </div>
         <div class="form-group col-sm-6">&nbsp;</div>
     </div>
   </div>
   <!--Documento Contratando-->
	<div class="row" id="doctol">
		<div class="form-group ">
			<div class="control-label col-sm-3 ">*Vale:</div>
			<div class="form-group col-sm-2">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Documento" name="noVale" id="noVale" onBlur="upperCase(this)" value="">
					<div class="input-group-btn"><button class="btn btn-info" id="img_presupuesto" name="img_presupuesto" onClick="getValesDisponibles()"><i class="glyphicon glyphicon-search"></i>
						</button>
						<button class="btn btn-danger" type="button"><i class="glyphicon glyphicon-remove" id="img_detele"></i></button>
						
					</div>
				</div>
			</div>
		</div>
	</div>
	<input name="" type="text" class="input" id="noVale" style="width:100px" value='' readonly="readonly" />
      <img id="img_presupuesto" src="../../imagenes/buscar.png" width="22" height="22" alt="Mostrar presupuesto" style="cursor:pointer" onclick="getValesDisponibles()" align="absmiddle" />
	<!--Fecha Deposito-->
   <div class="row">
     <div class="form-group">
         <div class="control-label col-sm-3 ">*Fecha de deposito:</div>
         <div class="form-group col-sm-3">
           <div class="input-group date">
               <input name="fechaDeposito" type="text" class="form-control" id="fechaDeposito" value='<c:out value="${fechaActual}"/>' size="15" maxlength="15" readonly="readonly"/>
               <span class="input-group-addon">
                 <span class="glyphicon glyphicon-calendar"></span>
               </span>
           </div>
           <input name="fecha2" type="hidden" class="input" id="fecha2" value=<%=new java.util.Date()%> style="width:111px" maxlength="10"/>
         </div>
         <div class="form-group col-sm-6">&nbsp;</div>
     </div>
   </div>
</div>

  <table width="95%" border="0"  align="center" cellpadding="0" cellspacing="0" class="formulario">
    <tr>
      <th height="17">&nbsp;</th>
      <td height="17">&nbsp;</td>
    </tr>
    <tr>
      <th height="30">
      *Unidad Administrativa :</th>
      <td height="30">
        <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
          <c:out value="${nombreUnidad}"/><input type="hidden" name="unidad" id="unidad" value='<c:out value="${idUnidad}"/>' />
        </sec:authorize>
        <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
          <select name="unidad" class="comboBox" id="unidad" style="width:445px">
            <c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
              <option value='<c:out value="${item.ID}"/>' <c:if test="${item.ID==idUnidad}"> selected </c:if>><c:out value="${item.DEPENDENCIA}"/></option>
            </c:forEach>
          </select>
      </sec:authorize></td>
    </tr>
    <tr>
      <td colspan="2" align="center"></td>
    </tr>
    <tr>
      <td colspan="2" ></td>
    </tr>
    <tr >
      <th width="16%" height="30"  ></th>
      <td width="84%"  >
      </td>
    </tr>
    <tr >
      <th height="30" >*Vale:</th>
      <td></td>
    </tr>
    <tr id="flla_proyecto" >
      <th height="30" >*Programa/Partida:</th>
      <td><select name="cbovales" class="comboBox" id="cbovales" style="width:222px">
      </select></td>
    </tr>
    <tr id="fila_comprobado">
      <th height="30" >Comprobado Programa/Partida:</th>
      <td><div id="comprobado"></div></td>
    </tr>
    <tr id="fila_restante">
      <th height="30" >Restante Programa/Partida:</th>
      <td><div id="restante"></div></td>
    </tr>
    <tr id="flla_importe" >
      <th height="30" >Importe total Vale :</th>
      <td><div id="importeVale"></div></td>
    </tr>
    <tr id="flla_descuento">
      <th height="30" >Descontado total:</th>
      <td><div id="descontado"></div></td>
    </tr>
    <tr >
      <th height="30" >*Importe:</th>
      <td>
        <input name="importe" type="text" class="input" id="importe" onkeypress=" return keyNumbero( event );" style="width:100px"  value='' maxlength="20">
      </td>
    </tr>
    <tr >
      <th height="30"  >Fecha de deposito:</th>
      <td ><input name="fechaDeposito" type="text" class="input" id="fechaDeposito" style="width:100px" value='<c:out value="${fechaActual}"/>' size="15" maxlength="15" readonly="readonly"/></td>
    </tr>
    <tr >
      <th height="30"  >&nbsp;</th>
      <td ><input name="xGrabar" type="button" class="botones" onclick=" guardarRembolso();" value="Guardar reembolso" style="width:150px"/>
      <input name="xGrabar2" type="button" class="botones"   onclick="limpiar();" value="Limpiar" style="width:150px"/></td>
    </tr>
    
    <tr >
      <td height="14" colspan="2" align="center">&nbsp;</td>
    </tr>
  </table><br />
  <table width="95%"  border="0" align="center"  cellpadding="0" cellspacing="0" class="listas"  id="detallesReembolsos" >
    <thead>
      <tr >
        <th width="1%" ><img src="../../imagenes/cross.png" width="16" height="16" onClick="eliminarReembolso()" style='cursor: pointer;'></th>
        <th width="20%" height="20"  align="center" >Tipo</th>
        <th width="20%"  >OP</th>
        <th width="11%"  >Programa</th>
        <th width="12%"  >Partida</th>
        <th width="11%"  >Fecha</th>
        <th width="11%"  >Fecha deposito</th>
        <th width="14%"  >Importe descontado</th>        
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  </form>
</body>
</html>


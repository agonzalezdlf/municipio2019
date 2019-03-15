<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE>
<html>
<head>
<title>Listado de Contratos</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/> 
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/js/multiselect/multiple-select.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<script type="text/javascript" src="lista_contratos.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorListadoContratosRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/interface/ControladorContratosRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"></script>
<script type="text/javascript" src="../../dwr/util.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
<script type="text/javascript" src="../../include/js/multiselect/multiple-select.js"></script>
<script type="text/javascript" src="../../include/js/toolsamV20.js?x=<%=System.currentTimeMillis()%>"></script>

<style type="text/css">
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
}
a:active {
	text-decoration: none;
}
</style>
<body >
<form  action="lista_contratos.action" method="POST" id="forma" name="forma">
<input type="hidden" name="ejercicio" id="ejercicio" value="<c:out value='${ejercicio}'/>">
<input type="hidden" name="cve_contrato" id="cve_contrato" >
	 
	<!-- Panel de filtros para la consulta style="background: #5B1D0A;color: #fff;"-->
	<div class="row">
	  <br>
	  <h2 class="col-md-offset-1">Contratos - Listado de Contratos</h2>
	  <div class="panel panel-default">
	    <div class="panel-heading" >
	    	<!-- Unidad -->
			<div class="form-group row">
	          <label for="grupo" class="col-md-1 control-label">Unidad:</label>
	          <div class="col-md-5">
	   			<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
	      			<c:out value="${nombreUnidad}"/>
	      			<input type="hidden" name="cbodependencia" class="form-control input-sm" id="cbodependencia" value='<c:out value="${idUnidad}"/>' />
	      		</sec:authorize>
	       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
	       			<select name="cbodependencia" class="form-control input-sm" id="cbodependencia">
	            		<option value="0" <c:if test='${item.ID==0}'> selected </c:if>>[Todas la Unidades Administrativas]</option>
	            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status"> 
	              		<option value='<c:out value="${item.ID}"/>' <c:if test='${item.ID==idUnidad}'> selected </c:if>><c:out value='${item.DEPENDENCIA}'/></option>
	              		</c:forEach>
	          		</select>
	          	
	      	  	</sec:authorize>
	          </div>
	          <label for="cbostatus" class="control-label col-md-2">Seleccione un Estatus</label>
	          <div class="col-md-2">
	          		<select id="cbostatus" name="cbostatus" style="width:200px; color:black;" multiple="multiple">
	          		 	<option value="0" <c:if test = "${fn:contains(cbostatus, '0')}"> selected </c:if>>Edición</option>
	  					<option value="1" <c:if test = "${fn:contains(cbostatus, '1')}"> selected </c:if>>Cerrado</option>
	  					<option value="3" <c:if test = "${fn:contains(cbostatus, '3')}"> selected </c:if>>Finiquitado</option>
	  					<option value="2" <c:if test = "${fn:contains(cbostatus, '2')}"> selected </c:if>>Cancelado</option>
	  				</select>
	      		
	          </div>
	        </div> 
	        <!--Termina Unidad -->
	        <!-- Tipo de gasto y boton buscar -->
	        <div class="form-group row">
	          <label for="grupo" class="col-md-1 control-label">Tipo de gasto:</label>
	          <div class="col-md-5">
	   			<select name="cbotipogasto" class="form-control input-sm" id="cbotipogasto">
				      <option value="0">[Todos los tipos de gastos]</option>
				      <c:forEach items="${tipodeGasto}" var="item" varStatus="status">
				        <option value='<c:out value="${item.ID}"/>' <c:if test='${item.ID==tipo_gto}'> selected</c:if>><c:out value='${item.RECURSO}'/></option>
				      </c:forEach>
	  			  </select>
	          </div>
	          <div class="col-md-offset-2 col-md-4">
	           	<input name="cmdbuscar" id="cmdbuscar" type="button" class="btn btn-buscar col-md-4" value="Buscar"/>
	  	      </div>
	      	</div> 
	      	<!--Termina tipo de gasto y boton buscar -->
      	  	<!-- Beneficiario -->
	      	<div class="form-group row">
	          <label for="grupo" class="col-md-1 control-label">Beneficiario:</label>
	          <div class="col-md-5">
   				<select name="cboprestadorservicio" class="selectpicker form-control input-sm" data-live-search="true" data-size="10" title="Seleccione un Beneficiario" id="cboprestadorservicio" style="width:100%">
                   <c:forEach items="${beneficiarios}" var="item" varStatus="status">
                         <option value='<c:out value="${item.CLV_BENEFI}"/>'
                         <c:if test='${item.CLV_BENEFI==CVE_BENEFI}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
                   </c:forEach>
             	</select>
      			<input type="hidden" id="CVE_BENEFI" name="CVE_BENEFI" value="<c:out value='${CVE_BENEFI}'/>" />
	          </div>
	         <div>
			 <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODOS_LOS_DOCUMENTOS_DE_LA_UNIDAD">
	  			<input type="checkbox" name="verUnidad" id="verUnidad" value="1"  <c:if test='${verUnidad==1}'>  checked </c:if> >Incluir documentos de la Unidad
	  		 </sec:authorize> 
	  		 
			</div>
	        </div>
	        <!-- Num. Factura-->
	    	<div class="form-group row">
	        	<label for="txtnumop" class="col-md-1 control-label">Proyecto:</label>
	         	<div class="col-md-2">
	         		<input name="txtproyecto" type="text" id="txtproyecto" maxlength="50" placeholder="Proyecto" style="width:150px" class="form-control input-sm" value="<c:out value='${txtproyecto}'/>">
	  			</div>
	  			<div class="col-md-2">
	  				<input name="txtpartida" class="form-control input-sm" type="text" id="txtpartida" placeholder="Partida" maxlength="50" style="width:150px" value="<c:out value='${txtpartida}'/>">
	    	  	</div>
	    	  	
	    	</div> 
	   		<!--Termina Num. Factura -->
	   		<!-- Num. Factura-->
	    	<div class="form-group row">
	        	<label for="txtnumop" class="col-md-1 control-label">Núm. Contrato:</label>
	         	<div class="col-md-2">
	  				<input name="txtcontrato" type="text"  id="txtcontrato" maxlength="50"  placeholder="Núm. Contrato" class="form-control input-sm" value="<c:out value='${txtcontrato}'/>">
	    	  	</div>
	    	  	
	    	  	
	    	  	
	    	</div> 
	        <!-- RANGO DE FECHAS DE FILTRADO -->
		    <div class="form-group row">
		    	<label for="grupo" class="col-md-1 control-label">Por fecha de:</label>
		        <div class="col-md-1">
		 				<input type="text" name="fechaInicial" id="fechaInicial" value="${fechaInicial}" size="12"maxlength="10" class="form-control input-sm" style="width:100px"  id="inputKey" placeholder="Desde">
		  		</div>
		   	 	<div class="col-md-1">
		 				<input type="text" name="fechaFinal"  id="fechaFinal" value="${fechaFinal}" size="12"  maxlength="10" class="form-control input-sm" style="width:100px"  id="inputValue" placeholder="Hasta">
		   	 	</div>
		   	</div> 
		   	<!-- TERMINA RANGO DE FECHAS DE FILTRADO -->
		</div><!-- Termina Panel heading -->
	   
	  </div>
	</div>

<br />
	<table width="95%" class="table table-hover table-sm"  align="center" id="listaRequisiciones"  cellpadding="0" cellspacing="0">
	 <thead>
	  <tr>
	    <th width="11%" height="20">No.</th>
	    <th width="9%">Número</th>
	    <th width="9%">Fecha inicio</th>    
	    <th width="9%">Fecha final</th>
	    <th width="22%">Beneficiario</th>
	    <th width="9%">Num. Doc.</th>
	    <th width="8%">Tipo</th>
	    <th width="8%">Status</th>
	    <th width="7%">Importe</th>    
	    <th width="8%">Opciones</th>
	  </tr>
	   </thead>   
	<tbody>  
	<c:set var="cont" value="${0}" /> 
	<c:forEach items="${listado}" var="item" varStatus="status"> 
	  <tr id='f<c:out value="${cont}"/>' onMouseOver="color_over('f<c:out value="${cont}"/>')" onMouseOut="color_out('f<c:out value="${cont}"/>')"/>
	      <td align="center" height="20">&nbsp;
	    <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_CONTRATOS">
	    	<c:if test='${item.STATUS==0||item.STATUS==1}'><input alt="&lt;c:out value='${item.CVE_CONTRATO}'/&gt;" type="checkbox" id="chkcontratos" name="chkcontratos" value="<c:out value='${item.CVE_CONTRATO}'/>"/></c:if>
	    </sec:authorize>    </td>
	    <td align="center">
	        <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUBMENU_ESPECIAL_EN_LISTADO_ORDENES_DE_PAGO">
	            <a href="javascript:subOpAdm('con', <c:out value='${item.CVE_CONTRATO}'/>, <c:out value='${item.CVE_PERS}'/>)">
	        </sec:authorize>
	        
	    	<c:out value='${item.NUM_CONTRATO}'/>
	        
	        <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUBMENU_ESPECIAL_EN_LISTADO_ORDENES_DE_PAGO">
	    		</a>
	    	</sec:authorize>
	        
	    </td>
	    <td align="center"><c:out value='${item.FECHA_INICIO}'/></td>
	    <td align="center"><c:out value='${item.FECHA_TERMINO}'/></td>
	    <td align="left">&nbsp;<c:out value='${item.PROVEEDOR}'/></td>
	    <td align="center"><c:out value='${item.NUM_DOCTOS}'/></td>
	    <td align="center"><c:out value='${item.TIPO_CONTRATO}'/></td>
	    <td align="center"><c:out value='${item.STATUS_DESC}'/></td>
	    <td align="right"><fmt:formatNumber value="${item.IMPORTE}"  pattern="#,###,###,##0.00" /> </td>
	    <td align="center">&nbsp;<img style="cursor:pointer" src="../../imagenes/pdf.gif" alt="Ver Documento" border="0" width="14" height="16" onClick="mostrarOpcionCONPDF('<c:out value='${item.ARCHIVO_ANEXO}'/>', ${item.CVE_CONTRATO})">
	    <c:if test='${item.STATUS==0}'>
	    <img src="../../imagenes/page_white_edit.png" title="Editar / Abrir" style="cursor:pointer" onClick="editarCON(<c:out value='${item.CVE_CONTRATO}'/>)"></c:if>
	    <c:if test='${item.STATUS!=0}'>
	    <img src="../../imagenes/page_gray_edit.png"  title="Editar / Abrir"></c:if>
	    <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_CONTRATOS">
	    	<c:if test='${item.STATUS==0||item.STATUS==1}'>
	    	<img id="Cancelarcontra" src="../../imagenes/cross.png" width="16" height="16" style="cursor:pointer" alt="">
	        </c:if>
	    </sec:authorize>     </td>
	    <c:set var="cont" value="${cont+1}"/>
	  </tr>
	  </c:forEach> 
	 <c:if test="${fn:length(listado) > 0}"> 
	 <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_APERTURAR_ORDEN_DE_PAGO"> 
	 <c:if test="${fn:contains(status,'0')||fn:contains(status,'1')}"> 
	  <tr>
	    <td height="37" colspan="10" align="left" style="background:#FFF"><table width="269" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <c:if test="${fn:contains(status,'1')}">
	          <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_APERTURAR_FACTURAS">
	            <td width="130" bgcolor="#FFFFFF"><div class="buttons tiptip">
	              <button name="cmdaperturar" id="cmdaperturar" title="Apertura para edicion los documentos seleccionados" type="button" class="button red middle"><span class="label" style="width:100px">Aperturar</span></button>
	            </div></td>
	          </sec:authorize>
	        </c:if>
	        <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_CONTRATOS">
	          <td width="139" bgcolor="#FFFFFF"><div class="buttons tiptip">
	            <button name="cmdcancelar" id="cmdcancelar"  title="Cancela o elimina los documentos seleccionados" type="button" class="button red middle" ><span class="label" style="width:100px">Cancelar</span></button>
	          </div></td>
	        </sec:authorize>
	      </tr>
	    </table></td>
	    </tr>
	    </c:if>
	    </sec:authorize>
	  </c:if>
	  
	  </tbody>  
	</table>
	<div class="alert alert-info">
		<strong>Total de registros encontrados: <c:out value='${cont}'/></strong>
	</div>


</form>
</body>
</html>

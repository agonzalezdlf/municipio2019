<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
<title>Listado de Vales</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">


<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js?x=<%=System.currentTimeMillis()%>"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="lista_vales.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="../../dwr/interface/controladorListadoValesRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"></script>


<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
	<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">



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
<form  action="lista_vales.action"  id="forma" name="forma">
<input type="hidden" name="ejercicio" id="ejercicio" value="<c:out value='${ejercicio}'/>">
<input type="hidden" name="cve_val" id="cve_val" >
<div class="row col-md-offset-2">
          <h1 class="h1-encabezado"> Vales - Listado de Vales</h1>
</div>  

<div class="well">
			<!-- Unidad -->
			<div class="row">
			<div class="form-group">
				
				<label for="grupo" class="col-md-2 control-label">Unidad:</label>
				<div class="form-group col-md-5">
					<sec:authorize
						ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
						<c:out value="${nombreUnidad}" />
						<input type="hidden" name="cbodependencia"
							class="form-control input-sm" id="cbodependencia"
							value='<c:out value="${idUnidad}"/>' />
					</sec:authorize>
					<sec:authorize
						ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
						<select name="cbodependencia" class="form-control input-sm"
							id="cbodependencia">
							<option value="0">[Todas la Unidades Administrativas]</option>
							<c:forEach items="${unidadesAdmiva}" var="item"
								varStatus="status">
								<option value='<c:out value="${item.ID}"/>'
									<c:if test='${item.ID==idUnidad}'> selected </c:if>><c:out
										value='${item.DEPENDENCIA}' /></option>
							</c:forEach>
						</select>
					</sec:authorize>
				</div>
				<div class="col-md-1">
					<input type="checkbox" name="status" id="status" value="0"
						<c:if test="${fn:contains(status,'0')}" >checked</c:if>>
					&nbsp;Edición
				</div>
				<div class="col-md-1" style="width: 220px;">
					<input type="checkbox" name="status" id="status" value="1"
						<c:if test="${fn:contains(status,'1')}" >checked</c:if>>&nbsp;Pendiente
					de Pagado
				</div>
				<div class="col-md-1">
					<input type="checkbox" name="status" id="status" value="4"
						<c:if test="${fn:contains(status,'4')}" >checked</c:if>>&nbsp;Pagado
				</div>
			</div>
			</div>
			<!-- Termin Unidad -->
			<!-- Tipo de gasto -->
			<div class="row">
				<div class="form-group">
					
					<label for="grupo" class="col-md-2 control-label">Tipo de
						gasto:</label>
					<div class="form-group col-md-5">
						<select name="cbotipogasto" class="form-control input-sm"
							id="cbotipogasto">
							<option value="0">[Todos los tipos de gastos]</option>
							<c:forEach items="${tipodeGasto}" var="item" varStatus="status">
								<option value='<c:out value="${item.ID}"/>'
									<c:if test='${item.ID==tipo_gto}'> selected</c:if>><c:out
										value='${item.RECURSO}' /></option>
							</c:forEach>
						</select>
					</div>
					<div class="col-md-1">
						<input name="status" type="checkbox" id="status"  value="3" <c:if test="${fn:contains(status,'3')}">checked</c:if>>&nbsp;Aprobado
					</div>
					<div class="col-md-1" style="width:173px;">
						<input type="checkbox" name="status" id="status"  value="2" <c:if test="${fn:contains(status,'2')}" >checked</c:if>>&nbsp;Cancelado
					</div>
					<div>
						<input name="btnBuscar" id="btnBuscar" type="button" class="btn btn-buscar" style="width: 150px;" value="Buscar" />
					</div>
				</div>
				<!-- Tipo de gasto -->
			</div>
			<div class="row">
				<div class="form-group"><!-- Beneficiario -->
		        <label for="grupo" class="col-md-2 control-label">Beneficiario:</label>
		        <div class="form-group col-md-5">
		   			<select name="cboprestadorservicio" class="selectpicker form-control input-sm" data-live-search="true" data-size="10" title="Seleccione un Beneficiario..." id="cboprestadorservicio" style="width:100%">
		            	<c:forEach items="${beneficiarios}" var="item" varStatus="status">
		                <option value='<c:out value="${item.CLV_BENEFI}"/>'
		                <c:if test='${item.CLV_BENEFI==CVE_BENEFI}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
		                </c:forEach>
		            </select>
		      		<input type="hidden" id="CVE_BENEFI" name="CVE_BENEFI" value="<c:out value='${CVE_BENEFI}'/>" />
		          </div>
		          <div class="col-md-2">
          		  <input type="checkbox" name="verUnidad" id="verUnidad" value="1"  <c:if test='${verUnidad==1}'>  checked </c:if>>Incluir documentos de la Unidad
          			</div>
		          <div class="col-md-1">
		          		<input name="cmdpdf" id="cmdpdf" type="button" class="btn btn-imprimir" style="width: 150px;" value="Imprimir PDF"/>
		          </div>
		      	</div> <!-- Beneficiario -->
		</div>
		<!-- Num. Vale -->
		<div class="row">
			<div class="form-group">
	        	<label for="txtnumvale" class="col-md-2 control-label">Núm. Vale:</label>
	          	<div class="form-group col-md-2">
	   				<input name="txtnumvale" type="text"  id="txtnumvale" maxlength="50"  placeholder="Núm. Vale" class="form-control input-sm" value="<c:out value='${txtnumvale}'/>">
	     	  	</div>
	     	   	<!--<label for="txtpedido" class="col-md-1 control-label">Núm. Pedido:</label>  -->
	     	  	<div class="form-group col-md-2">
	     	  		<input name="txtcontrato" class="form-control input-sm" type="text" id="txtcontrato" placeholder="Núm. Contrato" maxlength="50"  value="<c:out value='${txtcontrato}'/>">
	     	  	</div>	
	     	   
     		</div> 
		</div>
		<!--Termina Num. Vale -->
		<!-- Fecha inicial y final -->
		<div class="row">
			<div class="form-group">
	         	<label for="grupo" class="col-md-2 control-label">Desde:</label>
	          	<div class="form-group col-md-1">
	   				<input placeholder="Desde" type="text" name="fechaInicial" id="fechaInicial" value="${fechaInicial}" size="12"maxlength="10" class="form-control input-sm" style="width:100px"  id="inputKey">
	   			</div>
	     	  	<div class="col-md-1">
	   				<input type="text" name="fechaFinal"  id="fechaFinal" value="${fechaFinal}" size="12"  maxlength="10" class="form-control input-sm" style="width:100px"  id="inputKey" placeholder="Hasta">
	   			</div>
	     	 </div>
	     </div>
	     <!-- Fecha inicial y final -->
		
		</div>
		<!-- Termina well -->
		<table width="95%" class="table table-sm table-hover table-responsive" align="center" id="listaRequisiciones" cellpadding="0" cellspacing="0">
			<thead>
		  		<tr>
		   	 		<th width="4%"><input type="checkbox" name="todos" id="todos"></th>
		    		<th width="6%">Número</th>
		    		<th width="6%">Fecha</th>    
		    		<th width="48%">Beneficiario</th>
		    		<th width="9%">Tipo</th>
		    		<th width="9%">Estado</th>
		    		<th width="10%">Importe</th>    
		    		<th width="5%">Opciones</th>
		  		</tr>
		   </thead>   
		<tbody>  
		<c:set var="cont" value="${0}" />
		<c:forEach items="${vales}" var="item" varStatus="status"> 
			<tr id='f<c:out value="${cont}"/>'>
		 		<td align="center" style="border-left:none">
		    	<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_VALES">
		     		<c:if test='${item.STATUS==1|| item.STATUS == 0}'>
		        		<input alt="<c:out value='${item.CVE_VALE}'/>" type="checkbox" id="chkvales" name="chkvales" value="<c:out value='${item.CVE_VALE}'/>"/>
		        	</c:if>
		     	</sec:authorize>
		 		<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_APERTURA_DE_VALES">
		    		<c:if test="${item.STATUS==0||item.STATUS==1}"><input alt="<c:out value='${item.NUM_VALE}'/>" type="checkbox" id="chkvales" name="chkvales" value="<c:out value='${item.CVE_VALE}'/>"/></c:if>
		    	</sec:authorize>
		     	<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_APERTURA_DE_VALES">
		     		<c:if test="${item.STATUS==1|| item.STATUS == 0}"><input alt="<c:out value='${item.NUM_VALE}'/>" type="checkbox" id="chkvales" name="chkvales" value="<c:out value='${item.CVE_VALE}'/>"/></c:if>
		     	</sec:authorize>
		    	</td>
		    	<td align="center" style="border-left:none"><sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUBMENU_ESPECIAL_EN_LISTADO_VALES"><a href="javascript:subOpAdm('val', <c:out value='${item.CVE_VALE}'/>, <c:out value='${item.CVE_PERS}'/>)"></sec:authorize><c:out value='${item.NUM_VALE}'/><sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUBMENU_ESPECIAL_EN_LISTADO_VALES"></a></sec:authorize></td>
			    <td align="center" style="border-left:none"><c:out value='${item.FECHA}'/></td>
			    <td style="border-left:none"><c:out value='${item.NCOMERCIA}'/></td>
			    <td align="center" style="border-left:none"><c:out value='${item.TIPO_VALE}'/></td>
			    <td style="border-left:none" align="center"><c:out value='${item.DESCRIPCION_ESTATUS}'/></td>
			    <td align="right" style="border-left:none"><fmt:formatNumber value="${item.TOTAL}"  pattern="#,###,###,##0.00" /> </td>
		    	<td align="center">
			    	<c:if test="${item.STATUS==2}"><img src="../../imagenes/pdf2.png" alt="" border="0" width="14" height="16"></c:if>
			 		<c:if test="${item.STATUS!=2}"><img style="cursor:pointer" src="../../imagenes/pdf.gif" alt="Ver Documento" border="0" width="14" height="16" onClick="getReporteVale<c:if test="${item.TIPO eq 'AO'}"><sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_ANEXO_VALES">Anexo</sec:authorize></c:if>(<c:out value='${item.CVE_VALE}'/>)"></c:if>
			    	<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_SOLO_IMPRESION_GENERAL">
			        	<c:if test="${ item.STATUS == 0}">  
			        		<img src="../../imagenes/page_white_edit.png" alt="Editar / Abrir" style="cursor:pointer" onClick="editarVale(<c:out value='${item.CVE_VALE}'/>)">
			        	</c:if>
			        	<c:if test='${item.STATUS!=0}'>
			        		<img src="../../imagenes/page_gray_edit.png">
			        	</c:if>
			    	</sec:authorize>
			    	<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_VALES">
			            <c:if test='${item.STATUS==1 || item.STATUS==0}'>
			                <img style="cursor:pointer" src="../../imagenes/cross.png" title="Cancelar" border="0" width="16" height="16" onClick="cancelarVale(<c:out value='${item.CVE_VALE}'/>)">     
			            </c:if>
			            <c:if test='${item.STATUS!=1&&item.STATUS!=0}'>
			                <img src="../../imagenes/cross2.png" border="0" width="16" height="16">     
			            </c:if>
			    	</sec:authorize>
		    	</td>
			</tr>
			<c:set var="cont" value="${cont+1}" />
		</c:forEach> 
			<tr>
		    	<td colspan="8" height="25" style="background-color:#FFF" align="left"><strong>Total de registros encontrados: <c:out value='${cont}'/></strong></td>
		   	</tr> 
	</tbody>  
</table>
		
		
		
		
		

<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="formulario">

 
    <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODOS_LOS_DOCUMENTOS_DE_LA_UNIDAD">
    </sec:authorize>  
</table>
<br />

<!-- Tipo de Gasto-->
  <div class="row">
     <div class="form-group">
      <div class="col-sm-6 form-group">
     <c:if test="${fn:length(vales) > 0}">  
  		<c:if test="${fn:contains(status,'1')}">
			<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_SOLO_IMPRESION_GENERAL"></sec:authorize>
    	    	<input type="button" name="cmdaperturar" id="cmdaperturar" class="btn btn-warning " value="Aperturar" />
        </c:if>
 		<c:if test="${fn:contains(status,'0')||fn:contains(status,'1')}">
 			<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_SOLO_IMPRESION_GENERAL"></sec:authorize>
    			<input type="button" name="cmdeliminar2" id="cmdeliminar2" class="btn btn-danger" value="Cancelar" />
	    </c:if>
  	</c:if>  
  	</div>           
    </div>
 </div>

 
</form>
</body>
</html>
